import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { trainings } from '@/constants/Excercises'




  const addTrainingHandler = (trainingType:string) =>
  {
    router.push({pathname: "/trainingDetails/trainingDetails", params: {type: trainingType}})
  }

  const AddTraining = () => {

  
  return (
    <View>
      <Text style={styles.sectionTitle}>Dodaj trening</Text>
        <View style={styles.trainingIcons}>
          {trainings.map((training)=>
          {
            return (<TouchableOpacity style={styles.trainingButton} onPress={()=> {addTrainingHandler(training.trainingType)}} key={training.text}>
            <View style={styles.training}>
                <Image source={training.imageUrl} style={styles.trainingImage}/>
                <Text style={styles.trainingIconText}>{training.text}</Text> 
            </View>
          </TouchableOpacity>)
          })}
    </View>
    </View>
  )
}


export default AddTraining

const styles = StyleSheet.create({
    trainingIcons:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        flexWrap:'wrap',
      },
      trainingIconText:{
        color:'white',
        textAlign:'center',
        padding:10,
        borderRadius:10
      },
      training:{
        alignItems:'center'
      },
      trainingButton:{
        width: '30%',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
      },
      sectionTitle:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        padding:4,
        marginBottom:2
    },
    trainingImage:{
        width:50,
        height:50,
        tintColor:'#cbf078',
    }
  
})