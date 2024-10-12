import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Collapsible } from './Collapsible';
import { trainings as trainingTypes } from '@/constants/Excercises';

interface RepsState {
  weight: number;
  reps: number;   
}

interface Training {
  date: string;
  id: string;
  repsState: RepsState[]; 
  selectedExercise: string;
  trainingType: string;
}

const HistoryShort: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const fetchTrainings = async () => {
    try {
      const response = await fetch('https://gymtracker-c5f99-default-rtdb.firebaseio.com/trainings.json?orderBy=%22date%22&limitToLast=20');
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

  const trainingTypes = ['chest', 'back', 'shoulder', 'legs', 'biceps', 'triceps'];

  const getSortedTrainingsByType = (type: string) => {
    const filteredTrainings = trainings.filter((training) => training.trainingType === type);
    console.log(`Filtered ${type} trainings:`, filteredTrainings);

    return filteredTrainings.sort((a, b) => {
      const dateA = new Date(a.date.split('.').reverse().join('-'));
      const dateB = new Date(b.date.split('.').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.sectionTitle}>Ostatnie treningi</Text>
      <View style={styles.lastTrainingList}>
        {trainingTypes.map((type) => {
          const sortedTrainings = getSortedTrainingsByType(type);
          const latestDate = sortedTrainings.length > 0 ? sortedTrainings[0].date : null;
          const latestTrainings = sortedTrainings.filter(training => training.date === latestDate);

          if (latestTrainings.length === 0) return null;

          return (
            <View key={type} style={styles.trainingListItem}>
              <Text style={{ color: 'white', position: 'absolute', right: 8, top: 12 }}>{latestDate}</Text>
              <Collapsible title={type}>
                {latestTrainings.map((training) => (
                  <Collapsible key={training.id} title={training.selectedExercise}>
                    <View>
                      <Text style={styles.listItemInfo}>
                        Ilość powtórzeń: {training.repsState.map(rep => `${rep.reps} (${rep.weight} kg)`).join(", ")}
                      </Text>
                    </View>
                  </Collapsible>
                ))}
              </Collapsible>
            </View>
          );
        })}
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
    marginBottom: 10,
  },
  listItemInfo: {
    color: 'white'
  }
});

export default HistoryShort;
