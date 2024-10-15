import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import exercises from '@/constants/Excercises';
import { Picker } from '@react-native-picker/picker';

interface GymProps {
  trainingType: string,
  onSendHandler: (trainingDetails:trainingDetails)=> void
}

interface trainingDetails {
  trainingType: string;
  repsState: [],
  selectedExercise:string
}

const Measurement: React.FC = () => {

    const [measurement, setMeasurement] = useState({height: '', weight: ''})

    const handleInputChange = (type:string, value:string) =>
    {
        setMeasurement((prev) =>{
            return {
                ...prev,
                [type]: value
            }
        })
    }

    useEffect(()=>
    {
        console.log(measurement)
    }, [measurement])

    return (
        <View style={styles.homeMainBox}>
          <View style={styles.homePageSection}>
            <Text style={styles.sectionTitle}>Pomiary</Text>
          </View>
            <View style={styles.inputRow}>
              <View>
                <Text style={styles.inputLabel}>Wzrost (cm)</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.amountInput}
                  value={measurement.height} // Zabezpieczenie
                  onChangeText={(value) => handleInputChange('height', value)}
                />
              </View>
              <View>
                <Text style={styles.inputLabel}>Waga (kg)</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.amountInput}
                  value={measurement.weight} // Zabezpieczenie
                  onChangeText={(value) => handleInputChange('weight', value)}
                />
              </View>
            </View>
        </View>
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
    amountInput: {
        backgroundColor: '#e0ffcd',
        padding: 8,
        borderRadius: 10,
        fontSize: 20,
        width: 120,
        marginRight: 10,
      },

    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      inputLabel: {
        color: 'white',
        marginBottom: 6,
      },
  });
