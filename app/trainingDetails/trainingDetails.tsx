import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Gym from '@/components/trainings/gym';
import Abs from '@/components/trainings/abs';
import Pullups from '@/components/trainings/pullups';
import Running from '@/components/trainings/running';

const TrainingDetails = () => {

  interface trainingDetails {
    trainingType: string,
    repsState: []
  }

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

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  useEffect(()=>
{
    console.log(date.toUTCString())
}, [date])

const sendTraining = ({trainingType, repsState}:trainingDetails):void =>
{
  //need to send this ot DB and sign some Id to it
  console.log({
    date,
    trainingType,
    repsState
  })
}


  return (
    <View style={styles.detailsMainBox}>
        <View>
            <Text style={styles.sectionTitle}>Dodaj trening</Text>
            <Text style={[styles.sectionTitle, {fontSize:28}]}>{type ? trainingTitles[`${type}`]: 'Nieznany trening'}</Text>
        </View>
        <View style={styles.calendarSection}>
          <Text style={{color:'white', marginRight:10}}>Wybierz datę</Text>
          <TouchableOpacity onPress={showDatepicker} style={styles.calendarButton}>
            <FontAwesome name="calendar" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.calendarDate}>{date.toLocaleDateString()}</Text>
        </View>
        <View style={{flex:1}}>
          {(type=== 'chest' || type === 'back' || type==="shoulder" || type==="triceps" || type==="legs" || type ==='biceps') && <Gym trainingType={type} onSendHandler={sendTraining}/>}
          {type ==='abs' && <Abs trainingType={type}/>}
          {type ==='pullups' && <Pullups trainingType={type}/>}
          {type ==='running' && <Running trainingType={type}/>}
        </View>


        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}
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
        fontSize:16,
        fontWeight:'bold',
        padding:4,
        marginBottom:2,
    },
    calendarSection:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-evenly',
      alignItems:'center',
      marginTop:8,
      borderWidth:1,
      borderColor:'gray',
      borderRadius:10,
      padding:12
    },
    calendarButton:{
      backgroundColor:'#cbf078', 
      padding:12,
      marginRight:24,
      borderRadius:50
    },
    calendarDate:{
      color:'white',
      paddingHorizontal:8,
      paddingVertical:4,
      fontSize:26,
      borderRadius:10,
      borderBottomColor:'white',
      borderWidth:1,
    }
})