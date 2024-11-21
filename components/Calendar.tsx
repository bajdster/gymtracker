import {Agenda, Calendar} from 'react-native-calendars'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocaleConfig } from 'react-native-calendars';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const TrainingsCalendar = () => {

    LocaleConfig.locales['pl'] = {
        monthNames: [
          'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 
          'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
        ],
        monthNamesShort: [
          'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 
          'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'
        ],
        dayNames: [
          'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 
          'Czwartek', 'Piątek', 'Sobota'
        ],
        dayNamesShort: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'],
        today: 'Dziś',
      };
      
      LocaleConfig.defaultLocale = 'pl';


  return (
    <SafeAreaView style={{marginBottom:10, flex:1}}>

      <Agenda        
      style={{
        borderWidth: 1,
        borderColor: 'white',
        borderRadius:10,
        height: 300,
      }}
      theme={{
        backgroundColor: '#000000',
        calendarBackground: '#000000',
        textSectionTitleColor: '#cbf078',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#ffffff',
        textDisabledColor: '#393e46',
        agendaKnobColor: '#cbf078',
      }}
      items={{
        '2024-10-21': [{name:'Meeting 1 ', data:'dupaduopa'}],
        '2024-11-22': [{name:'Meeting 1 ', data:'dupaduopa'}],
        '2024-11-21': [{name:'Meeting 2 ', data:'dupaduopa'}]
      }}
      renderItem={(item, isFirst) => (
        <TouchableOpacity style={{ backgroundColor: 'gray', padding: 10, borderRadius: 5, marginRight:5, marginTop:5}}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
          <Text style={{ color: 'white' }}>{item.data}</Text>
        </TouchableOpacity>
      )}
      />
    </SafeAreaView>
  )
}

export default TrainingsCalendar

const styles = StyleSheet.create({})