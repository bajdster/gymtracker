import { StyleSheet, Text, View, Button, TouchableOpacity, Modal, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Gym from '@/components/trainings/gym';
import Calistenic from '@/components/trainings/calistenic';
import Running from '@/components/trainings/running';
import { sendTrainingToDB, updateTrainingToDB} from '@/lib/trainingManagement';

const TrainingDetails = () => {

  interface TrainingDetails {
    date:string
    trainingType: string,
    repsState: [],
    selectedExercise:string
  }

  const { type, trainingItem } = useLocalSearchParams();
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [initialData, setInitialData] = useState(null);

  const isEditMode = Boolean(trainingItem);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

useEffect(() => {

  if (isEditMode) {
    try {
      const deserializedItem = JSON.parse(decodeURIComponent(trainingItem));
      setInitialData(deserializedItem);
      if (deserializedItem.date) {
        setDate(new Date(deserializedItem.date));
      }
    } catch (error) {
      console.error('Error parsing trainingItem:', error);
    }
  }
}, [trainingItem]);

const sendTraining = async ({ trainingType, repsState, selectedExercise }: TrainingDetails): Promise<void> => {
  const formattedDate = date.toISOString().split('T')[0];
  
  try {
    await sendTrainingToDB({
      date: formattedDate, 
      trainingType,
      repsState,
      selectedExercise,
    });
    // Ustaw wiadomość i pokaż modal
    setModalMessage('Trening dodany pomyślnie!');
    setModalVisible(true);
  } catch (error) {
    // Ustaw wiadomość o błędzie, jeśli potrzebne
    setModalMessage('Wystąpił błąd podczas dodawania treningu.');
    setModalVisible(true);
  }
};

const updateTraining = async ({ trainingType, repsState, selectedExercise}: TrainingDetails): Promise<void> => {
  const formattedDate = new Date().toISOString().split('T')[0];

  try {
    await updateTrainingToDB(initialData?.id, {
      date: initialData.date, 
      trainingType,
      repsState,
      selectedExercise,
    });

    setModalMessage('Trening edytowany pomyślnie!');
    setModalVisible(true);
  } catch (error) {
    setModalMessage('Wystąpił błąd podczas edytowania treningu.');
    setModalVisible(true);
  }
}


  return (
    <View style={styles.detailsMainBox}>
        <View>
            <Text style={[styles.sectionTitle, {backgroundColor:'#cbf078', paddingHorizontal:8, paddingVertical:10, borderRadius:2, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4,}]}>Dodaj trening / {type ? trainingTitles[`${type}`]: 'Nieznany trening'}</Text>
        </View>
        <View style={styles.calendarSection}>
          <Text style={{color:'white', marginRight:10}}>Wybierz datę</Text>
          <TouchableOpacity onPress={showDatepicker} style={styles.calendarButton}>
            <FontAwesome name="calendar" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.calendarDate}>{date.toLocaleDateString()}</Text>
        </View>
        {isEditMode ? (
            <View style={{flex:1}}>
              <View style={{
                  borderWidth: 1,
                  borderBottomColor: 'white',
                  padding: 10,
                  width:'40%',
                }}>
                  <Text style={{
                    color: 'lightgray', 
                    fontSize: 12,
                  }}>
                    Edycja treningu
                  </Text>
                </View>
            {(type=== 'chest' || type === 'back' || type==="shoulder" || type==="triceps" || type==="legs" || type ==='biceps') && <Gym trainingType={type} onSendHandler={updateTraining} initialItem={initialData}/>}
            {(type ==='abs' || type ==='pullups' )&& <Calistenic trainingType={type} onSendHandler={updateTraining}/>}
            {type ==='running' && <Running trainingType={type} onSendHandler={updateTraining}/>}
          </View>
        ): (
          <View style={{flex:1}}>
            <View style={{
              borderWidth: 1,
              borderBottomColor: 'white',
              padding: 10,
              width:'40%'
            }}>
              <Text style={{
                color: 'lightgray', 
                fontSize: 12,
              }}>
                Dodawanie treningu
              </Text>
            </View>
          {(type=== 'chest' || type === 'back' || type==="shoulder" || type==="triceps" || type==="legs" || type ==='biceps') && <Gym trainingType={type} onSendHandler={sendTraining}/>}
          {(type ==='abs' || type ==='pullups' )&& <Calistenic trainingType={type} onSendHandler={sendTraining}/>}
          {type ==='running' && <Running trainingType={type} onSendHandler={sendTraining}/>}
        </View>
        )}
       


        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        router.push("/");
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalVisible(false);
              router.push("/"); 
            }}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

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
      padding:10,
      backgroundColor:'#222831'
    },
    calendarButton:{
      backgroundColor:'#cbf078', 
      padding:10,
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
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalMessage: {
      marginBottom: 20,
      fontSize: 18,
      textAlign: 'center',
    },
    modalButton: {
      backgroundColor: '#cbf078',
      padding: 10,
      borderRadius: 5,
    },
    modalButtonText: {
      color: 'white',
      fontSize: 16,
    },
})