import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchAllTrainings } from '@/lib/trainingManagement';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getTrainingsNames } from '@/constants/Excercises';

const Statistics = () => {
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
  const [sortedByType, setSortedByType] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const screenWidth = Dimensions.get('window').width;

  const trainingTypes = ['chest', 'back', 'shoulder', 'legs', 'biceps', 'triceps', 'abs', 'pullups', 'running'];

  const isDataLoaded =
    sortedByType &&
    sortedByType.chest &&
    sortedByType.back &&
    sortedByType.shoulder &&
    sortedByType.legs &&
    sortedByType.biceps &&
    sortedByType.triceps &&
    sortedByType.abs &&
    sortedByType.pullups &&
    sortedByType.running;

  const data = isDataLoaded
    ? {
        labels: trainingTypes,
        datasets: [
          {
            data: trainingTypes.map((type) => sortedByType[type]?.length || 0),
          },
        ],
        legend: ['Dni treningowe'],
      }
    : null;

  const getAllTrainings = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  useEffect(() => {
    getAllTrainings();
    console.log(allTrainings);
  }, []);

  const getSortedTrainingsByType = () => {
    const sortedByType: any = {};
    trainingTypes.forEach((type) => {
      sortedByType[type] = allTrainings.filter((training) => training.trainingType === type);
    });

    return sortedByType;
  };

  const lastDaysTrainings = (days: number) => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - days);

    const filteredTrainings = allTrainings.filter((training) => {
      const trainingDate = new Date(training.date.split('.').reverse().join('-'));
      return trainingDate >= pastDate;
    });

    return filteredTrainings;
  };

  useEffect(() => {
    if (allTrainings.length > 0) {
      const groupedTrainings = getSortedTrainingsByType();
      setSortedByType(groupedTrainings);
      console.log(groupedTrainings);
    }
  }, [allTrainings]);

  return (
    <View style={styles.homeMainBox}>
      <View style={styles.homePageSection}>
        <Text style={styles.sectionTitle}>Statystyki</Text>
      </View>
      <View>
        <Text style={{ color: 'white' }}>Wszystkie dodane treningi: {allTrainings && allTrainings.length}</Text>
        <Text style={{ color: 'white' }}>Treningi z ostatnich 7 dni: {lastDaysTrainings(7).length}</Text>
        <Text style={{ color: 'white' }}>Treningi z ostatnich 14 dni: {lastDaysTrainings(14).length}</Text>

        <View style={styles.trainingsStats}>
          {trainingTypes.map((type) => (
            <View key={type} style={styles.tableCell}>
              <Text style={{ color: 'white' }}>{getTrainingsNames(type)}</Text>
              <Text style={{ color: 'white' }}>{sortedByType[type] ? sortedByType[type].length : 0}</Text>
            </View>
          ))}
        </View>

        {/* Sprawdzenie, czy dane są załadowane */}
        <View style={{justifyContent:'center', alignItems:'center', marginTop:20}}>
        {data ? (
          <LineChart
            data={data}
            width={screenWidth * 0.93}
            height={220}
            fromZero={true}
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#cbf078',
              backgroundGradientFrom: '#4c9173',
              backgroundGradientTo: '#a2c11c',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 2,
              decimalPlaces: 0,
              propsForLabels: {
                fontSize: 10,  
                fill: '#ffffff', 
                fontWeight:'bold'
              },
            }}
          />
        ) : (
          <Text style={{ color: 'white' }}>Ładowanie danych...</Text>
        )}
        </View>
      </View>
    </View>
  );
};

export default Statistics;

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
  trainingsStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  tableCell: {
    width: '33%',
    padding: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#222831'
  },
});
