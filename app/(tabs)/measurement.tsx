import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import exercises from '@/constants/Excercises';
import { Picker } from '@react-native-picker/picker';

interface MeasurementProps {
  height: string,
  weight:string,
  chest:string,
  arm:string,
  waist:string,
  hips:string,
  thigh:string,
  forearm:string
}

const Measurement: React.FC = () => {

    const [measurement, setMeasurement] = useState<MeasurementProps>({height: '', weight: '', chest:'', arm:'',
      waist:'', hips:'', thigh: '', forearm:'' })

    const handleInputChange = (type:string, value:string) =>
    {
        setMeasurement((prev) =>{
            return {
                ...prev,
                [type]: value
            }
        })
    }

    function checkBMI()
    {
      const heightInMeters = measurement.height ? +measurement.height * 0.01 : 0
      if(!measurement.height) return 0
      const BMI:number | any = measurement.weight && +measurement.weight/(heightInMeters*heightInMeters)
      return Math.round(BMI)
    }

    useEffect(()=>
    {
        console.log(measurement)
        console.log(checkBMI())
    }, [measurement])

    const getBMIBarStyle = () => {
      const bmi = checkBMI();
      let barColor = 'green';
      let barWidth = '50%'; // domyślny styl dla normalnego BMI

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
          height: 20, // wysokość paska
          borderRadius: 10,
          marginTop: 10,
      };
  };

    return (
        <View style={styles.homeMainBox}>
          <View style={styles.homePageSection}>
            <Text style={styles.sectionTitle}>Pomiary</Text>
          </View>
            <View>
              <Text style={styles.measureLabel}>Ostatnie pomiary {"14-10-2024"}</Text>
            </View>
            <Text style={styles.measureLabel}>Dane podstawowe</Text>
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
            <View style={{flexDirection:'row', marginBottom:10}}>
              <Text style={styles.inputLabel}>BMI</Text>
              <Text style={styles.inputLabel}>{checkBMI()}</Text>
              <View style={getBMIBarStyle()} />
            </View>
            <View style={{flexDirection:'row', flexWrap:'wrap', width:'100%', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                  <View style={[styles.BMICircle, {backgroundColor:'blue'}]}></View>
                  <Text style={styles.inputLabel}>Niedowaga</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={[styles.BMICircle, {backgroundColor:'green'}]}></View>
                  <Text style={styles.inputLabel}>Waga prawidłowa</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={[styles.BMICircle, {backgroundColor:'yellow'}]}></View>
                  <Text style={styles.inputLabel}>Nadwaga</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={[styles.BMICircle, {backgroundColor:'red'}]}></View>
                  <Text style={styles.inputLabel}>Otyłość</Text>
                </View>
              </View>
            <Text style={styles.measureLabel}>Pomiary ciała (obwód cm)</Text>
              <View style={styles.inputRow}>
                <View>
                  <Text style={styles.inputLabel}>Klatka</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.amountInput}
                    value={measurement.chest} // Zabezpieczenie
                    onChangeText={(value) => handleInputChange('chest', value)}
                  />
                </View>
                <View>
                  <Text style={styles.inputLabel}>Ramię</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.amountInput}
                    value={measurement.arm} // Zabezpieczenie
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
                    value={measurement.waist} // Zabezpieczenie
                    onChangeText={(value) => handleInputChange('waist', value)}
                  />
                </View>
                <View>
                  <Text style={styles.inputLabel}>Biodra</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.amountInput}
                    value={measurement.hips} // Zabezpieczenie
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
                    value={measurement.thigh} // Zabezpieczenie
                    onChangeText={(value) => handleInputChange('thigh', value)}
                  />
                </View>
                <View>
                  <Text style={styles.inputLabel}>Przedramię</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.amountInput}
                    value={measurement.forearm} // Zabezpieczenie
                    onChangeText={(value) => handleInputChange('forearm', value)}
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
        width: 100,
        marginRight: 10,
      },

    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      inputLabel: {
        color: 'white',
        marginBottom: 6,
        marginTop:10,
        marginRight:10,
      },
      measureLabel:{
        color:'white',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        marginTop:10,
        fontWeight:'bold'
      },
      measureLabelDetail:{
        color:'white',
        fontSize:12
      },
      BMICircle:{
        width: 20,
        height: 20, // wysokość paska
        borderRadius: 10,
        marginTop: 10,
        marginRight:4
      }
  });
