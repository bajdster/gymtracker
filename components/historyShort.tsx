import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { transform } from '@babel/core'
import { Collapsible } from './Collapsible'

const HistoryShort = () => {
  return (
    <View style={{marginBottom:10}}>
      <Text style={styles.sectionTitle}>Ostatni treninig</Text>
      <View style={styles.lastTrainingList}>
        <View style={styles.trainingListItem}>
            <Collapsible title="Klatka">
                <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                <Text style={styles.listItemInfo}>Kilogramy</Text>
            </Collapsible>

        </View>
        <View style={styles.trainingListItem}>
            <Collapsible title="Plecy">
                <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                <Text style={styles.listItemInfo}>Kilogramy</Text>
            </Collapsible>
        </View>
        <View style={styles.trainingListItem}>
            <Collapsible title="Barki">
                <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                <Text style={styles.listItemInfo}>Kilogramy</Text>
            </Collapsible>
        </View>
        <View style={styles.trainingListItem}>
            <Collapsible title="Triceps">
                <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                <Text style={styles.listItemInfo}>Kilogramy</Text>
            </Collapsible>
        </View>
        <View style={styles.trainingListItem}>
            <Collapsible title="Nogi">
                <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                <Text style={styles.listItemInfo}>Kilogramy</Text>
            </Collapsible>
        </View>
        <View style={styles.trainingListItem}>
            <Collapsible title="Biceps">
                <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                <Text style={styles.listItemInfo}>Kilogramy</Text>
            </Collapsible>
        </View>
        <View style={styles.trainingListItem}>
            <Collapsible title="Brzuch">
                <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                <Text style={styles.listItemInfo}>Czas</Text>
            </Collapsible>
        </View>
        <View style={styles.trainingListItem}>
            <Collapsible title="Drążek">
                <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
            </Collapsible>
        </View>
        <View style={styles.trainingListItem}>
        <Collapsible title="Bieganie">
                <Text style={styles.listItemInfo}>Dystans</Text>
                <Text style={styles.listItemInfo}>Czas</Text>
            </Collapsible>
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