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
                <Collapsible title="Wyciskanie na sztandze leżąc">
                    <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                    <Text style={styles.listItemInfo}>Kilogramy</Text>
                </Collapsible>
                <Collapsible title="Rozpiętki na wyciągu">
                    <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                    <Text style={styles.listItemInfo}>Kilogramy</Text>
                </Collapsible>
                <Collapsible title="Wyciskanie hantli na ławce dodatniej">
                    <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                    <Text style={styles.listItemInfo}>Kilogramy</Text>
                </Collapsible>
            </Collapsible>

        </View>
        <View style={styles.trainingListItem}>
            <Collapsible title="Plecy">
                <Collapsible title="Ściąganie drążka nachwytem do klatki">
                    <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                    <Text style={styles.listItemInfo}>Kilogramy</Text>
                </Collapsible>
                <Collapsible title="Martwy ciąg">
                    <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                    <Text style={styles.listItemInfo}>Kilogramy</Text>
                </Collapsible>
                <Collapsible title="Przyciąganie wyciągu dolnego oburącz">
                    <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                    <Text style={styles.listItemInfo}>Kilogramy</Text>
                </Collapsible>
            </Collapsible>
        </View>
        <View style={styles.trainingListItem}>
            <Collapsible title="Barki">
                <Collapsible title="Arnoldki - wyciskanie hantli nad głowę z rotacją">
                    <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                    <Text style={styles.listItemInfo}>Kilogramy</Text>
                </Collapsible>
                <Collapsible title="Odwodzenie ramion w bok z hantlami">
                    <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                    <Text style={styles.listItemInfo}>Kilogramy</Text>
                </Collapsible>
                <Collapsible title="Wyciskanie sztangi nad głowę - żołnierskie">
                    <Text style={styles.listItemInfo}>Ilość powtórzeń</Text>
                    <Text style={styles.listItemInfo}>Kilogramy</Text>
                </Collapsible>
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