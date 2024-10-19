import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { deleteTrainingFromDB, fetchAllTrainings } from '@/lib/trainingManagement';
import { Collapsible } from '@/components/Collapsible'; // Importujemy Collapsible

const History = () => {
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
  const [filteredTrainings, setFilteredTrainings] = useState<Training[]>([]);
  
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isDeleting, setIsDeleting] = useState<Boolean>(false);
  const [modalVisible, setModalVisible] = useState<Boolean>(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedTrainingId, setSelectedTrainingId] = useState<string | null>(null);

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
      setFilteredTrainings(sorted); 
    } else {
      setAllTrainings([]);
      setFilteredTrainings([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllTrainings();
    console.log(allTrainings);
  }, []);


  const confirmDeleteHandler = (id: string) => {
    setSelectedTrainingId(id); 
    setModalMessage('Czy na pewno chcesz usunąć ten trening?');
    setModalVisible(true); 
  };

  const handleDeleteConfirmation = async () => {
    if (selectedTrainingId) {
      setIsDeleting(true);
      setModalVisible(false); 
      await deleteTrainingFromDB(selectedTrainingId); 
      await getAllTrainings();
      setIsDeleting(false);
    }
  };

  const handleInputChange = (value: string) => {
    if (!value) {
      setFilteredTrainings(allTrainings);
    } else {
      const filtered = allTrainings.filter(training => {
        const dateMatch = training.date.includes(value);
        const exerciseMatch = training.selectedExercise.toLowerCase().includes(value.toLowerCase());
        const typeMatch = training.trainingType.toLowerCase().includes(value.toLowerCase());
  
        return dateMatch || exerciseMatch || typeMatch;
      });
      setFilteredTrainings(filtered); 
    }
  };

  const renderItem = ({ item }: { item: Training }) => (
    <View style={{backgroundColor:'#222831', borderColor:'white', borderWidth:1, marginBottom:10}}>
      <Collapsible title={item.date} type={item.trainingType} selectedExcercise={item.selectedExercise}>
        {item.repsState.map((rep, index) => (
          <View key={index} style={styles.trainingDetails}>
            {item.trainingType === 'running' && (
              <Text style={styles.textStyle}>Bieg {index + 1} - Czas: {rep.reps}</Text>
            )}

            {(item.trainingType === 'pullups' || item.trainingType === 'abs') && (
              <Text style={styles.textStyle}>Seria {index + 1} - Ilość powtórzeń: {rep.reps}</Text>
            )}

            {item.trainingType !== 'running' && item.trainingType !== 'abs' && item.trainingType !== 'pullups' && (
              <Text style={styles.textStyle}>
                Seria {index + 1} - Ilość powtórzeń: {rep.reps}, Ciężar: {rep.weight} kg
              </Text>
            )}
          </View>
        ))}
          <TouchableOpacity style={{ padding: 20 }} onPress={() => confirmDeleteHandler(item.id)} disabled={isDeleting}>
            <Text style={{ color: 'red', position: 'absolute', right: 10, bottom: 10 }}>
              {isDeleting ? 'Usuwanie...' : 'Usuń trening'}
            </Text>
          </TouchableOpacity>
      </Collapsible>
    </View>
  );

  if (!allTrainings) {
    return (<Text style={{color:'white'}}>Nie dodano żadnego treningu</Text>);
  }
  if (isLoading || isDeleting) {
    return <Text style={{ color: 'white', fontSize: 22 }}>Ładowanie...</Text>;
  }

  return (
    <View style={styles.homeMainBox}>
      <View style={styles.homePageSection}>
        <Text style={styles.sectionTitle}>Historia treningów</Text>
      </View>
      <View>
        <TextInput style={styles.filterInput} placeholder='Wpisz rodzaj treningu, datę lub ćwiczenie' onChangeText={(value)=> handleInputChange(value)}/>
      </View>
      <FlatList
        data={filteredTrainings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Modal potwierdzający usunięcie */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDeleteConfirmation}>
                <Text style={styles.modalButtonText}>Tak</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, {backgroundColor:'red'}]}
                onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButtonText]}>Nie</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default History;

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
  textStyle: {
    color: 'white',
    fontSize: 16,
  },
  trainingDetails: {
    backgroundColor: '#393e46',
    padding: 4,
    borderRadius: 4,
    width: '90%',
    marginBottom: 4,
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
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#cbf078',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  filterInput:{
    backgroundColor:'#e0ffcd',
    marginBottom: 20,
    height:50,
    borderRadius:10,
    padding:4,
    color:'black',
    fontSize:20
  }
});
