import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { trainings } from '@/constants/Excercises'




  const addTrainingHandler = (trainingType:string) =>
  {
    router.push({pathname: "/trainingDetails/trainingDetails", params: {type: trainingType}})
  }

const iconColors = ["#5585b5","#9fd3c7","#f95959","#347474","#6643b5","#f8f398","#a7bcb9","#fdc57b","#4c9173",]

  const AddTraining = () => {

  
  return (
    <View>
      <Text style={styles.sectionTitle}>Dodaj trening</Text>
        <View style={styles.trainingIcons}>
          {trainings.map((training, index)=>
          {
            return (
            <View style={{width:'30%', justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity style={styles.trainingButton} onPress={()=> {addTrainingHandler(training.trainingType)}} key={training.text}>
            <View style={styles.training}>
                <Image source={training.imageUrl} style={[styles.trainingImage, {tintColor:iconColors[index]}]}/>
            </View>
            </TouchableOpacity>
              <Text style={styles.trainingIconText}>{training.text}</Text> 
          </View>)
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
        width: 65,
        height:65,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        backgroundColor:'#222831',
        borderRadius:50
      },
      sectionTitle:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        padding:4,
        marginBottom:2
    },
    trainingImage:{
        width:40,
        height:40,
    }
  
})