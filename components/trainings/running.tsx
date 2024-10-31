import { StyleSheet, Text, View, ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, {useState} from 'react'
import exercises from '@/constants/Excercises'
import {Picker} from '@react-native-picker/picker';
import AddTrainingButton from '../addTrainingButton';

interface RunningProps {
  trainingType: string,
  onSendHandler: (trainingDetails:trainingDetails)=> void
}

interface trainingDetails {
  trainingType: string;
  repsState: [],
  selectedExercise:string
}

const Running:React.FC<RunningProps> = ({trainingType, onSendHandler}) => {

  const [seriesCount, setSeriesCount] = useState<string>('1');
  const [repsState, setRepsState] = useState<{ reps: string; weight: string }[]>([{ reps: '00:04:00', weight: '' }]); 

  const availableExercises: string[] = exercises[trainingType]; 
  const [selectedExercise, setSelectedExercise] = useState<string>(availableExercises[0]); 

  const handleInputChange = (index:number, type:string, value:string) => {
    // Logika formatowania czasu w hh:mm:ss
    let formattedValue = value.replace(/[^0-9]/g, ''); // Usuwamy wszystko oprócz cyfr

    if (formattedValue.length >= 3 && formattedValue.length <= 4) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{0,2})/, '$1:$2');
    } else if (formattedValue.length >= 5) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{2})(\d{0,2})/, '$1:$2:$3');
    }

    const updatedRepsState = [...repsState];
    updatedRepsState[index] = {
      ...updatedRepsState[index],
      [type]: formattedValue, // Aktualizujemy odpowiedni stan dla konkretnego biegu
    };
    setRepsState(updatedRepsState);
  };

  const addTrainingHandler = () => {
    const hasEmptyFields = repsState.some((series) => {
      return !series.reps
    });
  
    if (hasEmptyFields) {
      Alert.alert("Proszę uzupełnić dane treningu", "Należy uzupełnić czas");
      return;
    }


    console.log(repsState)  
    onSendHandler({
      trainingType,
      repsState,
      selectedExercise
    });
  };


  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView>
        <View style={styles.excerciseAmountInputsContainer}>
          <View style={{width:'100%'}}>
            <Text style={styles.inputLabel}>Wybierz ćwiczenie</Text>
            <Picker
              dropdownIconColor="#cbf078"
              style={{ backgroundColor: 'black', width: '100%' }}
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
        </View>

        <View style={styles.pickerContainer}>
        {Array.from({ length: parseInt(seriesCount, 10) }, (_, index) => (
          <View key={index} style={styles.excerciseDropdown}>
            <Text style={styles.inputLabel}>Bieg {index + 1}</Text>
            <View style={styles.inputRow}>
              <View>
                <Text style={styles.inputLabel}>Czas (hh:mm:ss)</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.amountInput}
                  value={repsState[index]?.reps || ''} // Zabezpieczenie
                  onChangeText={(value) => handleInputChange(index, 'reps', value)}
                  placeholder="hh:mm:ss"
                  maxLength={8} // Ograniczamy do 8 znaków (np. 01:23:45)
                />
              </View>
            </View>
          </View>
        ))}
      </View>
          <AddTrainingButton onAddTraining={addTrainingHandler}/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Running

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