import { StyleSheet, ScrollView, Text, View } from 'react-native'
import React from 'react'

const History = () => {
  return (
    <ScrollView style={styles.homeMainBox}>
      <View style={styles.homePageSection}>
        <Text style={styles.sectionTitle}>History</Text>
      </View>
      <View style={styles.homePageSection}>
      </View>
    </ScrollView>
  )
}

export default History

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