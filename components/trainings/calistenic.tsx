import { StyleSheet, Text, View, Alert, TextInput, ScrollView } from 'react-native'
import React, {useState} from 'react'
import exercises from '@/constants/Excercises'
import {Picker} from '@react-native-picker/picker';
import AddTrainingButton from '../addTrainingButton';

interface AbsProps {
  trainingType: string,
  onSendHandler: (trainingDetails:trainingDetails)=> void
}

interface trainingDetails {
  trainingType: string;
  repsState: [],
  selectedExercise:string
}

const Calistenic: React.FC<AbsProps> = ({trainingType, onSendHandler}) => {

  const [seriesCount, setSeriesCount] = useState<string>('4');
  const [repsState, setRepsState] = useState<{ reps: string; weight: string }[]>([{ reps: '8', weight: '' },{ reps: '8', weight: '' },{ reps: '8', weight: '' },{ reps: '8', weight: '' }]); 

  const availableExercises: string[] = exercises[trainingType]; 
  const [selectedExercise, setSelectedExercise] = useState<string>(availableExercises[0]); 

  const handleSeriesCountChange = (value: string) => {
    setSeriesCount(value);
    const parsedCount = parseInt(value, 10);
    if (!isNaN(parsedCount) && parsedCount >= 0) {
      const newRepsState = Array.from({ length: parsedCount }, (_, i) => ({
        reps: repsState[i]?.reps || '8', // Zabezpieczenie
        weight: repsState[i]?.weight || '', // Zabezpieczenie
      }));
      setRepsState(newRepsState);
    } else {
      setSeriesCount('1');
      setRepsState([{ reps: '', weight: '' }]);
    }
  };

  const handleInputChange = (index: number, field: 'reps' | 'weight', value: string) => {
    if (index >= 0 && index < repsState.length) {
      const updatedRepsState = [...repsState];
      updatedRepsState[index][field] = value;
      setRepsState(updatedRepsState);
    } else {
      console.warn(`Index ${index} does not exist in repsState.`);
    }
  };

  const addTrainingHandler = () => {
    const hasEmptyFields = repsState.some((series) => {
      return !series.reps
    });
  
    if (hasEmptyFields) {
      Alert.alert("Proszę uzupełnić dane treningu", "Należy uzupełnić ilość powtórzeń i ciężar");
      return;
    }
  
    onSendHandler({
      trainingType,
      repsState,
      selectedExercise
    });
  };


  return (
    <ScrollView>
      <View style={styles.excerciseAmountInputsContainer}>
        <View>
          <Text style={styles.inputLabel}>Wybierz ćwiczenie</Text>
          <Picker
            dropdownIconColor="#cbf078"
            style={{ backgroundColor: 'black', width: 250 }}
            selectedValue={selectedExercise}
            onValueChange={(itemValue) => setSelectedExercise(itemValue)}
          >
            {availableExercises.map((exercise) => (
              <Picker.Item
                label={exercise}
                value={exercise}
                style={{ backgroundColor: 'black', color: 'white' }}
                key={exercise}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.seriesPickerContainer}>
          <Text style={styles.inputLabel}>Ilość serii</Text>
          <Picker
            dropdownIconColor="#cbf078"
            style={{ backgroundColor: 'black', width: 90 }}
            selectedValue={seriesCount}
            onValueChange={(itemValue) => handleSeriesCountChange(itemValue)}
          >
            <Picker.Item label="1" value="1" style={{ backgroundColor: 'black', color: 'white' }}/>
            <Picker.Item label="2" value="2" style={{ backgroundColor: 'black', color: 'white' }}/>
            <Picker.Item label="3" value="3" style={{ backgroundColor: 'black', color: 'white' }}/>
            <Picker.Item label="4" value="4" style={{ backgroundColor: 'black', color: 'white' }}/>
            <Picker.Item label="5" value="5" style={{ backgroundColor: 'black', color: 'white' }}/>
          </Picker>
        </View>
      </View>

      <View style={styles.pickerContainer}>
        {Array.from({ length: parseInt(seriesCount, 10) }, (_, index) => (
          <View key={index} style={styles.excerciseDropdown}>
            <Text style={styles.inputLabel}>Seria {index + 1}</Text>
            <View style={styles.inputRow}>
              <View>
                <Text style={styles.inputLabel}>Ilość powtórzeń</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.amountInput}
                  value={repsState[index]?.reps || ''} // Zabezpieczenie
                  onChangeText={(value) => handleInputChange(index, 'reps', value)}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
        <AddTrainingButton onAddTraining={addTrainingHandler}/>
    </ScrollView>
  );
}

export default Calistenic

const styles = StyleSheet.create({
  excerciseDropdown: {
    marginTop: 12,
  },
  excerciseAmountInputsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seriesPickerContainer: {
    marginTop: 2,
  },
  inputLabel: {
    color: 'white',
    marginBottom: 6,
  },
  amountInput: {
    backgroundColor: '#e0ffcd',
    padding: 8,
    borderRadius: 10,
    fontSize: 20,
    width: 120,
    marginRight: 10,
  },
  pickerContainer: {
    marginTop: 2,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});