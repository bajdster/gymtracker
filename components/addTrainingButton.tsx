import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

interface AddTrainingHandlerProps {
    onAddTraining: ()=> void
}

const AddTrainingButton:React.FC<AddTrainingHandlerProps> = ({onAddTraining}) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onAddTraining}>
        <Text style={styles.addButtonLabel}>Dodaj</Text>
    </TouchableOpacity>
  )
}

export default AddTrainingButton

const styles = StyleSheet.create({
    addButton:{
        width:'100%',
        height:50,
        backgroundColor:"#cbf078",
        marginTop:18,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    addButtonLabel:{
        color:'white',
        fontSize:22,
        fontWeight:'bold'
    }
})