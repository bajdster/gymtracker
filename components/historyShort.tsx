import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Collapsible } from './Collapsible';

interface RepsState {
  weight: number;
  reps: number;   
}

interface Training {
  date: string;          // Oczekiwany format: "DD.MM.YYYY"
  id: string;
  repsState: RepsState[]; 
  selectedExercise: string;
  trainingType: string;
}

const HistoryShort: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]); // Typ stanu

  const fetchTrainings = async () => {
    try {
      const response = await fetch('https://gymtracker-c5f99-default-rtdb.firebaseio.com/trainings.json');
      const data = await response.json();

      console.log("Received data from Firebase:", data);

      if (typeof data === 'object' && data !== null) {
        const trainingsArray: Training[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        
        setTrainings(trainingsArray);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  // Filtrowanie treningów według typu 'chest' i sortowanie ich według daty
  const sortedChestTrainings = trainings
    .filter((training) => training.trainingType === 'chest')
    .sort((a, b) => {
      const dateA = new Date(a.date.split('.').reverse().join('-')); // Przekształcanie "DD.MM.YYYY" do "YYYY-MM-DD"
      const dateB = new Date(b.date.split('.').reverse().join('-'));
      return dateB.getTime() - dateA.getTime(); // Sortowanie malejąco
    });

  // Wybieramy treningi tylko z najnowszą datą
  const latestDate = sortedChestTrainings.length > 0 ? sortedChestTrainings[0].date : null;
  const latestTrainings = sortedChestTrainings.filter(training => training.date === latestDate);

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.sectionTitle}>Ostatni trening</Text>
      <View style={styles.lastTrainingList}>
        <View style={styles.trainingListItem}>  
          <Text style={{color:'white', position:'absolute', right:8, top:12}}>{latestDate}</Text>
          <Collapsible title="Klatka">
            {latestTrainings.map((training) => (
              <Collapsible key={training.id} title={training.selectedExercise}>
                <Text style={styles.listItemInfo}>
                  Ilość powtórzeń: {training.repsState.map(rep => `${rep.reps} (${rep.weight} kg)`).join(", ")}
                </Text>
                <Text style={styles.listItemInfo}>Data: {training.date}</Text>
              </Collapsible>
              //need to add nice looking table for reps and weight 
            ))}
          </Collapsible>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 4,
    marginBottom: 2
  },
  lastTrainingList: {
    width: '100%'
  },
  trainingListItem: {
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 12,
  },
  listItemInfo: {
    color: 'white'
  }
});

export default HistoryShort;
