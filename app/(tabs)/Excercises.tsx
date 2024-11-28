import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import exercises from '@/constants/Excercises';
import AntDesign from '@expo/vector-icons/AntDesign';
import { imagesSources } from '@/constants/Excercises';

const Excercises = () => {
  const [selectedBodypart, setSelectedBodypart] = useState<string>("chest");
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const bodyparts = ["chest", "back", "shoulder", "triceps", "legs", "biceps"];

  const plNames = {
    chest: "Klatka",
    back: "Plecy",
    shoulder: "Barki",
    legs: "Nogi",
    triceps: "Triceps",
    biceps: "Biceps",
  };

  const handleButtonPress = (bodypart: string) => {
    setSelectedBodypart(bodypart);
  };

  const handleOpenModal = (source: string) => {
    setImageSource(source);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setImageSource(null);
  };

  return (
    <ScrollView style={styles.homeMainBox}>
      <View style={styles.homePageSection}>
        <Text style={styles.sectionTitle}>Atlas ćwiczeń</Text>
        <Text style={styles.description}>Zaczerpnij inspiracji do nowych ćwiczeń</Text>
      </View>

      <View style={styles.exerciseControllerBox}>
        {bodyparts.map((bodypart, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.controllerButton,
              selectedBodypart === bodypart && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress(bodypart)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedBodypart === bodypart && styles.selectedButtonText,
              ]}
            >
              {plNames[bodypart]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 20 }}>
        {exercises[selectedBodypart.toString()].map((exercise, index) => (
          <TouchableOpacity
            key={index}
            style={styles.exerciseLink}
            onPress={() => handleOpenModal(imagesSources[exercise])}
          >
            <Text style={{ color: 'white', width: '60%' }}>{exercise}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={imagesSources[exercise]}
                style={{ width: 95, height: 95, marginRight: 10 }}
                resizeMode="cover"
              />
              <AntDesign name="right" size={24} color="white" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
          <View style={styles.modalContent}>
            {imageSource && (
              <Image
                source={imageSource}
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
              />
            )}
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default Excercises;

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
  description: {
    fontSize: 11,
    color: '#f7f7f7',
    padding: 4,
    marginBottom: 10,
  },
  exerciseControllerBox: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controllerButton: {
    backgroundColor: 'white',
    width: '30%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#a9c52f',
  },
  buttonText: {
    color: 'black',
  },
  selectedButtonText: {
    color: 'white',
  },
  exerciseLink: {
    width: '100%',
    padding: 10,
    backgroundColor: '#222831',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    height: '60%',
    backgroundColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
