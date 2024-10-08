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

//https://console.firebase.google.com/u/0/project/gymtracker-c5f99/database/gymtracker-c5f99-default-rtdb/data