import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { transform } from '@babel/core'

const HistoryShort = () => {
  return (
    <View style={{marginBottom:10}}>
      <Text style={styles.sectionTitle}>Ostatni treninig</Text>
      <View style={styles.lastTrainingList}>
        <View style={styles.trainingListItem}>
            <Text style={styles.listItemInfo}>Klatka</Text>
            <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
            <Text style={styles.listItemInfo}>Kilogramy</Text>
        </View>
        <View style={styles.trainingListItem}>
            <Text style={styles.listItemInfo}>Plecy</Text>
            <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
            <Text style={styles.listItemInfo}>Kilogramy</Text>
        </View>
        <View style={styles.trainingListItem}>
            <Text style={styles.listItemInfo}>Barki</Text>
            <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
            <Text style={styles.listItemInfo}>Kilogramy</Text>
        </View>
        <View style={styles.trainingListItem}>
            <Text style={styles.listItemInfo}>Triceps</Text>
            <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
            <Text style={styles.listItemInfo}>Kilogramy</Text>
        </View>
        <View style={styles.trainingListItem}>
            <Text style={styles.listItemInfo}>Nogi</Text>
            <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
            <Text style={styles.listItemInfo}>Kilogramy</Text>
        </View>
        <View style={styles.trainingListItem}>
            <Text style={styles.listItemInfo}>Biceps</Text>
            <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
            <Text style={styles.listItemInfo}>Kilogramy</Text>
        </View>
        <View style={styles.trainingListItem}>
            <Text style={styles.listItemInfo}>Brzuch</Text>
            <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
        </View>
        <View style={styles.trainingListItem}>
            <Text style={styles.listItemInfo}>Drążek</Text>
            <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
        </View>
        <View style={styles.trainingListItem}>
            <Text style={styles.listItemInfo}>Bieganie</Text>
            <Text style={styles.listItemInfo}>Czas</Text>
            <Text style={styles.listItemInfo}>Dystans</Text>
        </View>
      </View>
    </View>
  )
}

export default HistoryShort

const styles = StyleSheet.create({
    sectionTitle:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        padding:4,
        marginBottom:2
    },
    lastTrainingList:{
        width:'100%'
    },
    trainingListItem:{
        borderWidth:1,
        borderColor:'gray',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:4,
        paddingVertical:12
    },
    listItemInfo:{
        color:'white'
    }
})