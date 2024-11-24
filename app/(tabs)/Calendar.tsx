import { Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocaleConfig } from 'react-native-calendars';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchAllTrainings } from '@/lib/trainingManagement';
import { useState, useEffect } from 'react';

interface Training {
  date: string;
  id: string;
  repsState: RepsState[];
  selectedExercise: string;
  trainingType: string;
}

const TrainingsCalendar = () => {
  const [allTrainings, setAllTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [agendaItems, setAgendaItems] = useState<{ [date: string]: any[] }>({});

  const getAllTrainings = async () => {
    setIsLoading(true);
    const response = await fetchAllTrainings();

    if (response) {
      // Sortowanie treningów po dacie malejąco
      const sorted: Training[] = response.sort((a, b) => {
        const dateA = new Date(a.date.split('.').reverse().join('-'));
        const dateB = new Date(b.date.split('.').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
      });

      setAllTrainings(sorted);

      // Grupowanie danych według dat
      const groupedItems: { [date: string]: any[] } = sorted.reduce((acc, training) => {
        if (!acc[training.date]) {
          acc[training.date] = [];
        }
        acc[training.date].push({
          name: training.selectedExercise,
          data: training.trainingType,
        });
        return acc;
      }, {});

      setAgendaItems(groupedItems);
    } else {
      setAllTrainings([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllTrainings();
  }, []);

  // Konfiguracja języka polskiego dla kalendarza
  LocaleConfig.locales['pl'] = {
    monthNames: [
      'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
      'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień',
    ],
    monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
    dayNames: [
      'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa',
      'Czwartek', 'Piątek', 'Sobota',
    ],
    dayNamesShort: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'],
    today: 'Dziś',
  };

  LocaleConfig.defaultLocale = 'pl';

  return (
    <SafeAreaView style={{ marginBottom: 10, flex: 1 }}>
      <Agenda
        style={{
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 10,
          height: 400,
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
        items={agendaItems}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={{ backgroundColor: 'gray', padding: 10, borderRadius: 5, marginRight: 5, marginTop: 5 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ color: 'white' }}>{item.data}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default TrainingsCalendar;

const styles = StyleSheet.create({});
