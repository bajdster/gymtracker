import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchAllMeasurements, fetchAllTrainings } from '@/lib/trainingManagement';
// import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getTrainingsNames } from '@/constants/Excercises';
import { Picker } from '@react-native-picker/picker';
import measurementNames from '@/constants/Measurements';
import TrainingsCalendar from '@/components/Calendar';


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
    // Dodaj inne parametry pomiarów według potrzeb
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

  console.log(allTrainings)
  console.log(filteredTrainings)
  //dodać filtrowanie po dacie i dodawanie do jedego wora wszystkich treninigów z danej daty do wyświetlenia w kalndarzu

  return (
    <ScrollView style={styles.homeMainBox}>

      

      <View style={styles.homePageSection}>
        <Text style={styles.sectionTitle}>Statystyki</Text>
      </View>

      <TrainingsCalendar/>

      <View style={{ borderWidth: 1, borderColor: 'white', padding: 8, borderRadius: 10, backgroundColor:'#181c22' }}>
        <View style={{ marginBottom: 10, borderBottomColor: 'white', borderBottomWidth: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>Treningi</Text>
        </View>
        <Text style={{ color: 'white' }}>Wszystkie dodane treningi: {allTrainings.length}</Text>
        <Text style={{ color: 'white' }}>Treningi z ostatnich 7 dni: {filterTrainingsByPeriod('7').length}</Text>
        <Text style={{ color: 'white' }}>Treningi z ostatnich 14 dni: {filterTrainingsByPeriod('14').length}</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Pokaż wyniki z ostatnich:</Text>

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


        {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          {data ? (
            <LineChart
              data={data}
              width={screenWidth * 0.9}
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
                  fontWeight: 'bold',
                },
              }}
            />
          ) : (
            <Text style={{ color: 'white' }}>Ładowanie danych...</Text>
          )}
        </View> */}
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
    backgroundColor: '#222831',
  },
  measurementStats: {
    marginTop: 10,
  },
});