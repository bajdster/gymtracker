import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import exercises from '@/constants/Excercises';
import { Picker } from '@react-native-picker/picker';
import { MeasurementProps } from '@/types/types';
import AddTrainingButton from '@/components/addTrainingButton';
import { sendMeasurementToDB } from '@/lib/trainingManagement';
import { fetchAllMeasurements } from '@/lib/trainingManagement';
import measurementNames from "../../constants/Measurements"
import { Collapsible } from '@/components/Collapsible';

const Measurement: React.FC = () => {

  const [measurement, setMeasurement] = useState<MeasurementProps>({
    height: '', 
    weight: '', 
    chest: '', 
    arm: '', 
    waist: '', 
    hips: '', 
    thigh: '', 
    forearm: ''
  });

  const [allMeasures, setAllMeasures] = useState<MeasurementProps>([])
  const [fetchedMeasurement, setFetchedMeasurement] = useState<MeasurementProps[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  const handleInputChange = (type: string, value: string) => {
    setMeasurement((prev) => {
      return {
        ...prev,
        [type]: value
      };
    });
  };

  function checkBMI() {
    const heightInMeters = measurement.height ? +measurement.height * 0.01 : 0;
    if (!measurement.height) return 0;
    const BMI: number | any = measurement.weight && +measurement.weight / (heightInMeters * heightInMeters);
    return Math.round(BMI);
  }

  const getAllMeasurements = async () => {
    try {
      setIsLoading(true);
      const response = await fetchAllMeasurements();
      
  
      if (Array.isArray(response) && response.length > 0) {
        const reversedResponse = response.reverse();
        setAllMeasures(reversedResponse);
        
        const latestMeasurement = reversedResponse[0] && typeof reversedResponse[0] === 'object' 
          ? reversedResponse[0] 
          : null;
  
  
        if (latestMeasurement) {
          setFetchedMeasurement({
            height: latestMeasurement.height ?? '', 
            weight: latestMeasurement.weight ?? '', 
            chest: latestMeasurement.chest ?? '', 
            arm: latestMeasurement.arm ?? '', 
            waist: latestMeasurement.waist ?? '', 
            hips: latestMeasurement.hips ?? '', 
            thigh: latestMeasurement.thigh ?? '', 
            forearm: latestMeasurement.forearm ?? '',
            date: latestMeasurement.date ?? '',
            bmi: latestMeasurement.bmi ?? ''
          });
        } else {
          console.warn('Unexpected measurement format:', reversedResponse[0]);
          setFetchedMeasurement({});
        }
      } 
      //no measures fetched from API
      else 
      {
        setAllMeasures([]);
        setFetchedMeasurement({});
      }
    } catch (error) {
      console.error('Error fetching measurements:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  useEffect(() => {
    getAllMeasurements();
  }, []);


  const getBMIBarStyle = () => {
    const bmi = checkBMI();
    let barColor = 'green';

    if (bmi < 18.5) {
      barColor = 'blue'; // niedowaga
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      barColor = 'green'; // prawidłowa waga
    } else if (bmi >= 25 && bmi <= 29.9) {
      barColor = 'yellow'; // nadwaga
    } else if (bmi >= 30) {
      barColor = 'red'; // otyłość
    }

    return {
      backgroundColor: barColor,
      width: 20,
      height: 20,
      borderRadius: 10,
      marginTop: 10,
    };
  };

  const isMeasurementEmpty = (measurement) => {
    return Object.keys(measurement).every(key => measurement[key] === '');
  };

  const sendMeasurement = async () => {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    const data = {
      ...measurement,
      date: formattedDate,
      bmi: checkBMI(),
    };
    if(!isMeasurementEmpty(measurement))
    {
      await sendMeasurementToDB(data);
      await getAllMeasurements()
    }
    else
    {
      Alert.alert("Wpisz dane pomiarowe")
    }
  };

  const fillInputsWithLatestMeasurements = () => {
    if(Object.keys(fetchedMeasurement).length === 0)
    {
      Alert.alert("Brak dodanych pomiarów do wczytania")
      return 
    }
    else setMeasurement(fetchedMeasurement);
  }

  if(isLoading)
  {
    return <Text style={{ color: 'white', fontSize:22 }}>Ładowanie...</Text>
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.homeMainBox}>
          <View style={[styles.homePageSection, {flexDirection:'row', justifyContent:'space-between'}]}>
            <Text style={styles.sectionTitle}>Pomiary</Text>
            <TouchableOpacity onPress={fillInputsWithLatestMeasurements} style={{borderWidth:1, borderColor:'#cbf078', borderRadius:4}}>
              <Text style={styles.loadButton}>Wczytaj ostatni pomiar</Text>
            </TouchableOpacity>
          </View>

            <View style={{backgroundColor:'#181c22', borderRadius:10, padding:6}}>
              <Text style={styles.measureLabel}>Ostatni pomiar {fetchedMeasurement && fetchedMeasurement.date}</Text>
              <View style={styles.measurementsStats}>
                {fetchedMeasurement && Object.keys(fetchedMeasurement).length > 0 ? Object.keys(fetchedMeasurement)
                  .filter((key) => key !== 'id' && key !== 'date' && fetchedMeasurement[key] !== null && fetchedMeasurement[key] !== undefined)
                  .map((key) => (
                    <View key={key} style={styles.tableCell}>
                      <Text style={{ color: 'white' }}>{measurementNames(key)}</Text>
                      <Text style={{ color: 'white' }}>{fetchedMeasurement[key]}</Text>
                    </View>
                )): <Text style={{color:'white', paddingBottom:10}}>Brak dodanych ostatnich pomiarów</Text>}
              </View>
            </View>
          <Text style={styles.measureLabel}>Dane podstawowe</Text>
          <View style={[styles.inputRow,{backgroundColor:'#181c22', borderRadius:10, padding:6}]}>
            <View>
              <Text style={styles.inputLabel}>Wzrost (cm)</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.amountInput}
                value={measurement.height}
                onChangeText={(value) => handleInputChange('height', value)}
              />
            </View>
            <View>
              <Text style={styles.inputLabel}>Waga (kg)</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.amountInput}
                value={measurement.weight}
                onChangeText={(value) => handleInputChange('weight', value)}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={styles.inputLabel}>BMI</Text>
            <Text style={styles.inputLabel}>{checkBMI()}</Text>
            <View style={getBMIBarStyle()} />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between', backgroundColor:'#181c22', borderRadius:10, }}>
            <View style={{ flexDirection: 'row' , alignItems:'center', justifyContent:'center'}}>
              <View style={[styles.BMICircle, { backgroundColor: 'blue' }]}></View>
              <Text style={styles.bmiLabel}>Niedowaga</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'center' }}>
              <View style={[styles.BMICircle, { backgroundColor: 'green' }]}></View>
              <Text style={styles.bmiLabel}>Waga prawidłowa</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'center' }}>
              <View style={[styles.BMICircle, { backgroundColor: 'yellow' }]}></View>
              <Text style={styles.bmiLabel}>Nadwaga</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'center' }}>
              <View style={[styles.BMICircle, { backgroundColor: 'red' }]}></View>
              <Text style={styles.bmiLabel}>Otyłość</Text>
            </View>
          </View>
          <Text style={styles.measureLabel}>Pomiary ciała (obwód cm)</Text>
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.inputLabel}>Klatka</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.amountInput}
                value={measurement.chest}
                onChangeText={(value) => handleInputChange('chest', value)}
              />
            </View>
            <View>
              <Text style={styles.inputLabel}>Ramię</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.amountInput}
                value={measurement.arm}
                onChangeText={(value) => handleInputChange('arm', value)}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.inputLabel}>Talia</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.amountInput}
                value={measurement.waist}
                onChangeText={(value) => handleInputChange('waist', value)}
              />
            </View>
            <View>
              <Text style={styles.inputLabel}>Biodra</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.amountInput}
                value={measurement.hips}
                onChangeText={(value) => handleInputChange('hips', value)}
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View>
              <Text style={styles.inputLabel}>Udo</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.amountInput}
                value={measurement.thigh}
                onChangeText={(value) => handleInputChange('thigh', value)}
              />
            </View>
            <View>
              <Text style={styles.inputLabel}>Przedramię</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.amountInput}
                value={measurement.forearm}
                onChangeText={(value) => handleInputChange('forearm', value)}
              />
            </View>
          </View>
          <AddTrainingButton onAddTraining={sendMeasurement} />

          <View>
            <Text style={styles.measureLabel}>Wcześniejsze pomiary</Text>

          </View>
        </View>

            
        {allMeasures.length > 0 ? allMeasures.map((measure, measureIndex) => {
          return (
            <Collapsible title={measure.date} key={`${measure.id}-${measureIndex}`}>
              <View style={{flexDirection:'row', flexWrap:'wrap'}}>
              {Object.keys(measure)
                .filter((key) => key !== 'id' && key !== 'date')
                .map((key) => (
                  <View key={`${measure.id}-${key}`} style={styles.tableCell}>
                    <Text style={{ color: 'white' }}>{measurementNames(key)}</Text>
                    <Text style={{ color: 'white' }}>{measure[key]}</Text>
                  </View>
              ))}
              </View>
            </Collapsible>
          );
        }): <Text style={{color:'white', padding:20}}>Brak dodanych wcześniejszych pomiarów</Text>}
          


      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Measurement;

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
  loadButton: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    padding:4
  },
  amountInput: {
    backgroundColor: '#e0ffcd',
    padding: 8,
    borderRadius: 10,
    fontSize: 20,
    width: 100,
    marginRight: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#181c22', 
    borderRadius:10,
    padding:6
  },
  inputLabel: {
    color: 'white',
    marginBottom: 6,
    marginTop: 10,
    marginRight: 10,
  },
  bmiLabel: {
    color: 'white',
    marginBottom: 6,
    marginTop: 10,
    marginRight: 10,
    fontSize:12
  },
  measureLabel: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold'
  },
  measureLabelDetail: {
    color: 'white',
    fontSize: 12
  },
  BMICircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 4,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  measurementsStats: {
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
