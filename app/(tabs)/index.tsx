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

//implement deleting trenings from history tab
//maybe create store for statistics ? 
//modal when training is added successfully? +
//modal when measurement is added?
// create separate file with types to implement DRY 
//osobna tab z pomiarami ciała +
//dodać ikonki ćwiczeń (dłuśza z powodu przekształcenia całego pliku Excercises.ts)
//dostosowac statystyki do wybranego przedziału dni/miesiecy/lat