import { StyleSheet, Text, TouchableOpacity,ScrollView, View, Image } from 'react-native'
import React from 'react'
import AddTraining from '@/components/addTraining'
import HistoryShort from '@/components/historyShort'

const Home = () => {
  return (
    <ScrollView style={styles.homeMainBox}>
      <View style={styles.homePageSection}>
        <AddTraining/>
      </View>
      <View style={styles.homePageSection}>
        <HistoryShort/>
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
    homeMainBox:{
        flex:1,
        paddingVertical:8,
        paddingHorizontal:14,
    },
    homePageSection:{
      width:'100%'
    },
    sectionTitle:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
        padding:4,
        marginBottom:10
    },
    
})

//maybe create store for statistics ? 
// create separate file with types to implement DRY 
//dodać ikonki ćwiczeń (dłuśza z powodu przekształcenia całego pliku Excercises.ts)
//dodać odświeżanie przy przeciągnieciu do góry

//dostosowac statystyki do wybranego przedziału dni/miesiecy/lat +
//dodać filtr w history do szukania po ćwiczeniu lub treningu +
//modal when training is added successfully? +
//osobna tab z pomiarami ciała +
//implement deleting trenings from history tab +