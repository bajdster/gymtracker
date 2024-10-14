import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Collapsible } from './Collapsible';
import { trainings as trainingTypes } from '@/constants/Excercises';
import { fetchHistoryShortTrainings } from '@/lib/trainingManagement';

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
  const [isLoading, setIsLoading] = useState(true); 

  const fetchTrainings = async () => {
    try {
      setIsLoading(true); 
      const response = await fetchHistoryShortTrainings()
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
    finally{
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const trainingTypes = ['chest', 'back', 'shoulder', 'legs', 'biceps', 'triceps', 'abs', 'pullups', 'running'];

  const getSortedTrainingsByType = (type: string) => {
    const filteredTrainings = trainings.filter((training) => training.trainingType === type);
    console.log(`Filtered ${type} trainings:`, filteredTrainings);

    return filteredTrainings.sort((a, b) => {
      const dateA = new Date(a.date.split('.').reverse().join('-'));
      const dateB = new Date(b.date.split('.').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  };

  if (isLoading) {
    return <Text style={{ color: 'white', fontSize:22 }}>Ładowanie...</Text>; 
  }
  
  if(trainings.length <= 0)
  {
    return <Text style={{ color: 'white', fontSize:22 }}>Nie masz jeszcze dodanych treningów</Text>
  }

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
                    <View style={styles.tableContainer}>
                      <View style={{alignItems:'center', marginBottom:10}}>
                          <Text style={{color:'white', marginLeft:50}}>{type==="running" ?'Czas' : 'Ilość powtórzeń'}</Text>
                          {training.repsState.map((rep, index) => 
                            <View style={{flexDirection:'row', alignItems:'center'}} key={index}>
                              {type === 'running' ? <Text style={{color:'white', marginRight:10}}>Bieg</Text> :<Text style={{color:'white', marginRight:10}}>{`Seria ${index+1}`}</Text>}
                              <View style={styles.tableCell}>   
                                <Text style={{color:'white'}}>{rep.reps}</Text>
                              </View>
                            </View>
                            )}
                      </View>
                      {training.repsState.some(rep => rep.weight) && (
                      <View style={{alignItems:'center'}}>
                        <Text style={{color:'white'}}>Ciężar (kg)</Text>
                        {training.repsState.map((rep, index) => (
                          <View style={styles.tableCell} key={index}>
                            <Text style={{color:'white'}}>{rep.weight}</Text>
                          </View>
                        ))}
                      </View>
                    )}
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
  },
  tableContainer:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  tableCell:{
    borderWidth:1,
    borderColor:'#e0ffcd',
    alignItems:'center',
    width:100,
  }
});

export default HistoryShort;
