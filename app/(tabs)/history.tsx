import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { fetchAllTrainings } from '@/lib/trainingManagement';
import { Collapsible } from '@/components/Collapsible'; // Importujemy Collapsible

const History = () => {
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

  const [allTrainings, setAllTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading]= useState<Boolean>(true)

  const getAllTrainings = async () => {
    setIsLoading(true)
    const response = await fetchAllTrainings();
    
    if (response) {
      const sorted: Training[] = response.sort((a, b) => {
        const dateA = new Date(a.date.split('.').reverse().join('-'));
        const dateB = new Date(b.date.split('.').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
      });
      setAllTrainings(sorted);
    } else {
      setAllTrainings([]);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    getAllTrainings();
    console.log(allTrainings);
  }, []);

  const renderItem = ({ item }: { item: Training }) => (
<Collapsible title={item.date} type={item.trainingType} selectedExcercise={item.selectedExercise}>
  {item.repsState.map((rep, index) => (
    <View key={index} style={styles.trainingDetails}>
      {item.trainingType === 'running' && (
        <Text style={styles.textStyle}>Bieg {index + 1} - Czas: {rep.reps}</Text>
      )}

      {(item.trainingType === 'pullups' || item.trainingType === 'abs') && (
        <Text style={styles.textStyle}>Seria {index + 1} - Ilość powtórzeń: {rep.reps}</Text>
      )}

      {item.trainingType !== 'running' && item.trainingType !== 'abs' && item.trainingType !== 'pullups' && (
        <Text style={styles.textStyle}>
          Seria {index + 1} - Ilość powtórzeń: {rep.reps}, Ciężar: {rep.weight} kg
        </Text>
      )}
    </View>
  ))}
</Collapsible>
  );

  if (isLoading) {
    return <Text style={{ color: 'white', fontSize:22 }}>Ładowanie...</Text>; 
  }

  if(!allTrainings)
  {
    return (<Text style={{color:'white'}}>Nie dodano żadnego treningu</Text>)
  }

  return (
    <View style={styles.homeMainBox}>
      <View style={styles.homePageSection}>
        <Text style={styles.sectionTitle}>Historia treningów</Text>
      </View>
      <FlatList
        data={allTrainings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  homeMainBox: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  homePageSection: {
    width: '100%',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 4,
    marginBottom: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
  },
  trainingDetails:{
    backgroundColor:'#393e46',
    padding:4,
    borderRadius:4,
    width:'90%',
    marginBottom:4
  },
});
