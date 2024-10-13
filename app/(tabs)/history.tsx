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

  const getAllTrainings = async () => {
    const response = await fetchAllTrainings();
    setAllTrainings(response);
  };

  useEffect(() => {
    getAllTrainings();
    console.log(allTrainings);
  }, []);

  const renderItem = ({ item }: { item: Training }) => (
    <Collapsible title={item.date} type={item.trainingType} selectedExcercise={item.selectedExercise}>
      {item.repsState.map((rep, index) => (
        <View key={index}>
          <Text style={styles.textStyle}>Set {index + 1} - Reps: {rep.reps}, Weight: {rep.weight}</Text>
        </View>
      ))}
    </Collapsible>
  );

  return (
    <View style={styles.homeMainBox}>
      <View style={styles.homePageSection}>
        <Text style={styles.sectionTitle}>History</Text>
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
});
