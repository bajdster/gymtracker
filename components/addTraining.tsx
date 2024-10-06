import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'

const AddTraining = () => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Dodaj trening</Text>
        <View style={styles.trainingIcons}>
          <TouchableOpacity style={styles.trainingButton}>
            <View style={styles.training}>
                <Image source={require("../assets/images/chest.png")} style={styles.trainingImage}/>
                <Text style={styles.trainingIconText}>Klatka</Text> 
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trainingButton}>
          <View style={styles.training}>
                <Image source={require("../assets/images/back.png")} style={styles.trainingImage}/>
                <Text style={styles.trainingIconText}>Plecy</Text> 
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trainingButton}>
          <View style={styles.training}>
                <Image source={require("../assets/images/shoulder.png")} style={styles.trainingImage}/>
                <Text style={styles.trainingIconText}>Barki</Text> 
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trainingButton}>
          <View style={styles.training}>
                <Image source={require("../assets/images/tricep.png")} style={styles.trainingImage}/>
                <Text style={styles.trainingIconText}>Tripceps</Text> 
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trainingButton}>
          <View style={styles.training}>
                <Image source={require("../assets/images/leg.png")} style={styles.trainingImage}/>
                <Text style={styles.trainingIconText}>Nogi</Text> 
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trainingButton}>
          <View style={styles.training}>
                <Image source={require("../assets/images/muscle.png")} style={styles.trainingImage}/>
                <Text style={styles.trainingIconText}>Biceps</Text> 
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trainingButton}>
          <View style={styles.training}>
                <Image source={require("../assets/images/abs.png")} style={styles.trainingImage}/>
                <Text style={styles.trainingIconText}>Brzuch</Text> 
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trainingButton}>
          <View style={styles.training}>
                <Image source={require("../assets/images/pullups.png")} style={styles.trainingImage}/>
                <Text style={styles.trainingIconText}>Drążęk</Text> 
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trainingButton}>
          <View style={styles.training}>
                <Image source={require("../assets/images/running.png")} style={styles.trainingImage}/>
                <Text style={styles.trainingIconText}>Bieganie</Text> 
            </View>
          </TouchableOpacity>
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
        tintColor:'white',
    }
  
})