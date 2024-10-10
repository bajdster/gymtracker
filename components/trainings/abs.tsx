import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import exercises from '@/constants/Excercises'
import {Picker} from '@react-native-picker/picker';

interface AbsProps {
  trainingType: string
}

const Abs: React.FC<AbsProps> = ({trainingType}) => {

  const [selectedExcercise, setSelectedExcercise] = useState<string>();

  const excecises: string[] = exercises[trainingType]

  return (
    <View style={styles.excerciseDropdown}>
      <Picker
        dropdownIconColor="#cbf078"
        style={{backgroundColor:'black'}}
        selectedValue={selectedExcercise}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedExcercise(itemValue)
        }>
        {excecises.map((excercise)=>
        {
          return (<Picker.Item label={excercise} value={excercise} style={{backgroundColor:'black', color: 'white'}} key={excercise}/>)
        })}
    </Picker>
    </View>
  )
}

export default Abs

const styles = StyleSheet.create({
  excerciseDropdown:{
    marginTop:12
  }
})