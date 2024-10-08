import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker';

const TrainingDetails = () => {

  const {type} = useLocalSearchParams()
  const trainingTitles:{[key: string]:string} = {
    chest: 'Klatka',
    back: 'Plecy',
    shoulder: 'Barki',
    triceps: 'Triceps',
    legs: 'Nogi',
    biceps: 'Biceps',
    abs: 'Brzuch',
    pullups: 'Drążek',
    running: 'Bieganie'
  }

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  return (
    <View style={styles.detailsMainBox}>
        <View>
            <Text style={styles.sectionTitle}>Dodaj trening</Text>
            <Text style={styles.sectionTitle}>{type ? trainingTitles[`${type}`]: 'Nieznany trening'}</Text>
        </View>
        <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Button onPress={showTimepicker} title="Show time picker!" />
        <Text style={styles.sectionTitle}>selected: {date.toLocaleString()}</Text>
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
        </View>
    </View>
  )
}

export default TrainingDetails

const styles = StyleSheet.create({
    detailsMainBox:{
        flex:1,
        paddingVertical:42,
        paddingHorizontal:14,
    },
    sectionTitle:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        padding:4,
        marginBottom:2
    },
})