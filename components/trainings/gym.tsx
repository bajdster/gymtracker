import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import exercises from '@/constants/Excercises';
import { Picker } from '@react-native-picker/picker';
import AddTrainingButton from '../addTrainingButton';
import { imagesSources } from '@/constants/Excercises';

interface GymProps {
  trainingType: string;
  onSendHandler: (trainingDetails: trainingDetails) => void;
  initialItem?: trainingDetails;
}

interface trainingDetails {
  trainingType: string;
  repsState: { reps: string; weight: string }[];
  selectedExercise: string;
}

const Gym: React.FC<GymProps> = ({ trainingType, onSendHandler, initialItem }) => {
  const [seriesCount, setSeriesCount] = useState<string>('4');
  const [repsState, setRepsState] = useState<{ reps: string; weight: string }[]>([
    { reps: '8', weight: '' },
    { reps: '8', weight: '' },
    { reps: '8', weight: '' },
    { reps: '8', weight: '' },
  ]);
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [imageSource, setImageSource] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState<Boolean>(false);

  const availableExercises: string[] = exercises[trainingType] || [];


  useEffect(() => {
    if (initialItem) {
      setSeriesCount(initialItem.repsState.length.toString());
      setRepsState(initialItem.repsState);
      setSelectedExercise(initialItem.selectedExercise || availableExercises[0] || '');
    } else if (availableExercises.length > 0) {
      setSelectedExercise(availableExercises[0]);
    }
  }, [initialItem, availableExercises]);

  useEffect(() => {

    const loadImage = async () => {
      setIsImageLoading(true);
      const source = await getImageSource(selectedExercise);
      setImageSource(source);
      setIsImageLoading(false);
    };

    if (selectedExercise) {
      loadImage();
    }
  }, [selectedExercise]);

  const getImageSource = async (exerciseName: string) => {
    return imagesSources[exerciseName] || null;
  };

  const handleSeriesCountChange = (value: string) => {
    setSeriesCount(value);
    const parsedCount = parseInt(value, 10);
    if (!isNaN(parsedCount) && parsedCount >= 0) {
      const newRepsState = Array.from({ length: parsedCount }, (_, i) => ({
        reps: repsState[i]?.reps || '8',
        weight: repsState[i]?.weight || '',
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
    const hasEmptyFields = repsState.some((series) => !series.reps || !series.weight);
    if (hasEmptyFields) {
      Alert.alert('Proszę uzupełnić dane treningu', 'Należy uzupełnić ilość powtórzeń i ciężar');
      return;
    }
    onSendHandler({
      trainingType,
      repsState,
      selectedExercise,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <View style={styles.excerciseAmountInputsContainer}>
            <View>
              <Picker
                dropdownIconColor="#cbf078"
                style={{ backgroundColor: 'black', width: 220 }}
                selectedValue={selectedExercise}
                onValueChange={(itemValue) => setSelectedExercise(itemValue)}
              >
                {availableExercises.map((exercise) => (
                  <Picker.Item
                    label={exercise}
                    value={exercise}
                    style={{ backgroundColor: 'black', color: 'white', fontSize: 12 }}
                    key={exercise}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.seriesPickerContainer}>
              <Text style={[styles.inputLabel, { fontSize: 12 }]}>Ilość serii</Text>
              <Picker
                dropdownIconColor="#cbf078"
                style={{ backgroundColor: 'black', width: 90 }}
                selectedValue={seriesCount}
                onValueChange={(itemValue) => handleSeriesCountChange(itemValue)}
              >
                {[...Array(5)].map((_, i) => (
                  <Picker.Item
                    label={`${i + 1}`}
                    value={`${i + 1}`}
                    style={{ backgroundColor: 'black', color: 'white' }}
                    key={i}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={{ width: '50%', alignItems: 'center', marginVertical: 10 }}>
            {isImageLoading ? (
              <Text style={{ color: 'white' }}>Ładowanie obrazu...</Text>
            ) : imageSource ? (
              <Image
                source={imageSource}
                style={{ width: 120, height: 120 }}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.inputLabel}>Brak obrazu dla tego ćwiczenia</Text>
            )}
          </View>
        </View>

        <View style={styles.pickerContainer}>
          {Array.from({ length: parseInt(seriesCount, 10) }, (_, index) => (
            <View key={index} style={styles.excerciseDropdown}>
              <Text style={[styles.inputLabel, { color: 'white', fontWeight: 'bold', textAlign: 'center' }]}>
                Seria {index + 1}
              </Text>
              <View style={styles.inputRow}>
                <View>
                  <Text style={styles.inputLabel}>Ilość powtórzeń</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.amountInput}
                    value={repsState[index]?.reps || ''}
                    onChangeText={(value) => handleInputChange(index, 'reps', value)}
                  />
                </View>
                <View style={{ marginTop: 6 }}>
                  <Text style={styles.inputLabel}>Ciężar (kg)</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.amountInput}
                    value={repsState[index]?.weight || ''}
                    onChangeText={(value) => handleInputChange(index, 'weight', value)}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        <AddTrainingButton onAddTraining={addTrainingHandler} title={initialItem? "Edytuj" : 'Dodaj'} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Gym;

const styles = StyleSheet.create({
  excerciseDropdown: {
    marginTop: 12,
    backgroundColor: '#222831',
    width: '45%',
    padding: 8,
    marginLeft: 10,
    borderRadius: 10,
  },
  excerciseAmountInputsContainer: {
    marginTop: 10,
    justifyContent: 'space-evenly',
    width: '55%',
  },
  seriesPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    color: 'white',
    marginBottom: 4,
  },
  amountInput: {
    backgroundColor: '#e0ffcd',
    padding: 6,
    borderRadius: 10,
    fontSize: 18,
    width: 120,
    marginRight: 10,
    textAlign: 'center',
  },
  pickerContainer: {
    marginTop: 2,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  inputRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
