import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { fetchAllMeasurements, fetchAllTrainings } from '@/lib/trainingManagement';
// import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getTrainingsNames } from '@/constants/Excercises';
import { Picker } from '@react-native-picker/picker';
import measurementNames from '@/constants/Measurements';
import TrainingsCalendar from '@/app/(tabs)/Calendar';


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

  interface Measurement {
    date: string;
    weight: number;
    chest: number;
    waist: number;
    hips: number;
  }

  const [allTrainings, setAllTrainings] = useState<Training[]>([]);
  const [allMeasures, setAllMeasures] = useState<Measurement[]>([]);
  const [filteredTrainings, setFilteredTrainings] = useState<Training[]>([]);
  const [sortedByType, setSortedByType] = useState<any>([]);
  const [trainingPeriod, setTrainingPeriod] = useState("All");
  const [selectedMeasurementDate, setSelectedMeasurementDate] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const screenWidth = Dimensions.get('window').width;

  const trainingTypes = ['chest', 'back', 'shoulder', 'legs', 'biceps', 'triceps', 'abs', 'pullups', 'running'];

  const isDataLoaded = sortedByType && trainingTypes.every(type => sortedByType[type]);

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

  const getAllMeasures = async () => {
    setIsLoading(true);
    const response = await fetchAllMeasurements();
    setAllMeasures(response);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllTrainings();
    getAllMeasures();
  }, []);

  //filtruje treningi na podstawie daty np. z przed 7 dni
  const filterTrainingsByPeriod = (period: string) => {
    if (period === 'All') return allTrainings;

    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - parseInt(period));

    return allTrainings.filter((training) => {
      const trainingDate = new Date(training.date.split('.').reverse().join('-'));
      return trainingDate >= pastDate;
    });
  };

  const calculateTotalWeight = () => {
    let totalWeight = 0;
    allTrainings?.forEach(training => {
      training.repsState.forEach(series => {
        totalWeight += Number(series.weight) || 0;
      });
    });
    return totalWeight;
  };

  //oblicza ile treningów zostało odbytych na podstawie tego ile ćwiczeń posiada tą samą datę
  const getAmountOfTrainingsInPeriod = (period: string) =>
  {
    function filterByPeriod(usedTrainings)
    {
      const uniqueTrainingDates = [
        ...new Set(usedTrainings.map(training => training.date))
      ];
      return uniqueTrainingDates
    }

    if(period === 'All')
    {
      const numberOfTrainings = filterByPeriod(allTrainings).length;
      return numberOfTrainings
    }

    if(period === '365')
    {
        const trainingsFromCurrentYear = allTrainings.filter(training => {
          const trainingYear = new Date(training.date).getFullYear();
          const year = new Date().getFullYear()
          return trainingYear === year;
      });
      const numberOfTrainings = filterByPeriod(trainingsFromCurrentYear).length;
      return numberOfTrainings
    }

    const allTrainingsFromPeriod = filterTrainingsByPeriod(period)
    const numberOfTrainings = filterByPeriod(allTrainingsFromPeriod).length
    return numberOfTrainings
  }

  //sortuje ćwiczenia po typie np (klatka) do wyświetlenia w tabelce
  const getSortedTrainingsByType = (trainings: Training[]) => {
    const sortedByType: any = {};
    trainingTypes.forEach((type) => {
      sortedByType[type] = trainings.filter((training) => training.trainingType === type);
    });

    return sortedByType;
  };

  useEffect(() => {
    const filtered = filterTrainingsByPeriod(trainingPeriod);
    setFilteredTrainings(filtered);
    const groupedTrainings = getSortedTrainingsByType(filtered);
    setSortedByType(groupedTrainings);
  }, [trainingPeriod, allTrainings]);

  const handleTrainingPeriod = (value: string) => {
    setTrainingPeriod(value);
  };

  const handleMeasurementDate = (value: string) => {
    setSelectedMeasurementDate(value); // Aktualizacja wybranej daty pomiaru
  };

  const getMeasurementForDate = (date: string | null) => {
    if (!date) return null;
    return allMeasures.find((measure) => measure.date === date); // Znajduje pomiary dla wybranej daty
  };

  if (isLoading) {
    return <Text style={{ color: 'white', fontSize: 22 }}>Ładowanie...</Text>;
  }

  const selectedMeasurement = getMeasurementForDate(selectedMeasurementDate); // Filtrowanie wybranego pomiaru


  return (
    <>
    <ScrollView style={styles.homeMainBox}>

      

      <View style={styles.homePageSection}>
        <Text style={styles.sectionTitle}>Statystyki</Text>
        <Text style={styles.description}>Sprawdź swoje postępy w treningach oraz pomiarach ciała</Text>
      </View>



      <View style={{ borderWidth: 1, borderColor: 'white', padding: 8, borderRadius: 10, backgroundColor:'#181c22' }}>
        <View style={{ marginBottom: 10, borderBottomColor: 'white', borderBottomWidth: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>Treningi</Text>
        </View>
        <Text style={{ color: 'white' }}>Wszystkie dodane treningi: {getAmountOfTrainingsInPeriod('All')}</Text>
        <Text style={{ color: 'white' }}>Wszystkie dodane ćwiczenia: {allTrainings.length}</Text>
        <Text style={{ color: 'white' }}>Treningi z ostatnich 7 dni: {getAmountOfTrainingsInPeriod('7')}</Text>
        <Text style={{ color: 'white' }}>Treningi z ostatnich 14 dni: {getAmountOfTrainingsInPeriod('14')}</Text>
        <Text style={{ color: 'white' }}>Treningów w bieżącym roku: {getAmountOfTrainingsInPeriod('365')}</Text>
        <Text style={{ color: 'white' }}>Łącznie podniesionych kilogramów {calculateTotalWeight()} kg</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', marginBottom:10 }}>Pokaż ćwiczenia na daną partię z ostatnich:</Text>

          <Picker
            dropdownIconColor="#cbf078"
            style={{ backgroundColor: 'black', width: '100%' }}
            selectedValue={trainingPeriod}
            onValueChange={(itemValue) => handleTrainingPeriod(itemValue)}
          >
            <Picker.Item label="Wszystkie" value="All" style={{ backgroundColor: 'black', color: 'white' }} />
            <Picker.Item label="7 dni" value="7" style={{ backgroundColor: 'black', color: 'white' }} />
            <Picker.Item label="14 dni" value="14" style={{ backgroundColor: 'black', color: 'white' }} />
            <Picker.Item label="30 dni" value="30" style={{ backgroundColor: 'black', color: 'white' }} />
            <Picker.Item label="1 roku" value="365" style={{ backgroundColor: 'black', color: 'white' }} />
          </Picker>
        </View>

        <View style={styles.trainingsStats}>
          {trainingTypes.map((type) => (
            <View key={type} style={styles.tableCell}>
              <Text style={{ color: 'white' }}>{getTrainingsNames(type)}</Text>
              <Text style={{ color: 'white' }}>{sortedByType[type] ? sortedByType[type].length : 0}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Nowa sekcja dla pomiarów ciała */}
      <View style={{ borderWidth: 1, borderColor: 'white', padding: 8, borderRadius: 10, marginBottom:10,backgroundColor:'#181c22' }}>
        <View style={{ marginBottom: 10, borderBottomColor: 'white', borderBottomWidth: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>Pomiary ciała</Text>
        </View>
        {allMeasures.length > 0 ? <Picker
          dropdownIconColor="#cbf078"
          style={{ backgroundColor: 'black', width: '100%' }}
          selectedValue={selectedMeasurementDate}
          onValueChange={(itemValue) => handleMeasurementDate(itemValue)}
        >
          {allMeasures.map((measure, index) => {
            return (
              <Picker.Item label={measure.date} value={measure.date} style={{ backgroundColor: 'black', color: 'white' }} key={index} />
            );
          })}
        </Picker>: <Text style={{ color: 'white', marginBottom: 4 }}>Brak dodanych pomiarów ciała</Text>}

        {selectedMeasurement ? (

            <View style={styles.trainingsStats}>

            {selectedMeasurement && (
              Object.keys(selectedMeasurement).length > 0 ? (
                Object.keys(selectedMeasurement)
                .filter((key) => key !== 'id' && key !== 'date')
                .map(key => (
                  <View key={key} style={styles.tableCell}>
                    <Text style={{ color: 'white' }}>{measurementNames(key)}</Text>
                    <Text style={{ color: 'white' }}>{selectedMeasurement[key]}</Text>
                  </View>
                ))
              ) : (
                <Text style={{ color: 'white' }}>Brak danych do wyświetlenia</Text>
              )
            )}
            </View>


        ) : (
          <Text style={{ color: 'white', marginTop: 10 }}>Wybierz datę pomiarów, aby zobaczyć szczegóły.</Text>
        )}
      </View>


    </ScrollView>
    </>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  homeMainBox: {
    flex: 1,
    paddingHorizontal: 8,
  },
  homePageSection: {
    width: '100%',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 4,

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
    backgroundColor: '#222831',
  },
  measurementStats: {
    marginTop: 10,
  },
  description:
  {
    fontSize:11,
    color:'#f7f7f7',
    padding: 4,
    marginBottom: 10,
  }
});