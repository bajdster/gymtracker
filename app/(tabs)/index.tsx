import { StyleSheet, Text, TouchableOpacity,ScrollView, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddTraining from '@/components/addTraining'
import HistoryShort from '@/components/historyShort'
import { getUserEmail } from '@/lib/trainingManagement'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

const Home = () => {

  const [userEmail, setUserEmail] = useState()

  useEffect(() => {
    const fetchEmail = async () => {
      const userId = await AsyncStorage.getItem('userId');
      console.log("UserId from AsyncStorage:", userId);  // Dodajemy log do sprawdzenia wartości
      if (userId) {
        const email = await getUserEmail(userId);  // Używamy userId, aby pobrać email
        setUserEmail(email);  // Ustawiamy stan z emailem
      }
    };
  
    fetchEmail();
  }, []);

  useEffect(()=>
  {
    console.log(userEmail)
  }, [])

  return (
    <ScrollView style={styles.homeMainBox}>
      <View style={styles.userSection}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <FontAwesome name="user" size={24} color="white" />
          <Text style={{color:'white', marginLeft:10}}>{userEmail}</Text>
        </View>
        <View style={{marginBottom:10}}>
          <AntDesign name="poweroff" size={24} color="red" />
        </View>
      </View>
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
    userSection:{
      marginBottom:15,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    }
    
})

//maybe create store for statistics ? 
// create separate file with types to implement DRY 

//dodać sekcję "dzisiejszy trening, gdzie będzie jaie aprtie były ćwiczone, ile czasu zajeło, łączny ciężar, łączna ilośc serii itp"
//edycja calistenics i running
//dodanie notatki do treningu 
//dodać więcej ćwiczeń
//dodanie opisów ćwiczeń do taba Excercises kiedy dotkniemy touchableOpacity
//dodanie notifications do aplikacji
//dodanie użytkowników poprzez dodanie autentykacji a następnie filtrowanie treningów do user_id


//pokazywanie najlepszych wyników z danego ćwiczenia danego dnia+
//dodanie animacji fadeIn za pomocą react native reanimated+
//filtrowanie po ćwiczeniu z przycisku w history+
//dodac do statystyk ile łącznie kilogramów podniesionych i serii wykonanych (motywacyjne)+
//poprawić w kalendarzu aby wyświetłay się polskie nazwy+
//łączenie kilku ćwiczeń w jeden trening w statystykach jeżeli zawieraja sie w tej samej dacie+
//poprawa przycisku w measurement+
//dodanie systemu oceniania treningu (gwiazdki)+
//dodanie congratulation w przypadku dodania treningu+
//dodanie kolorowania aktywnej serii+
//dodanie ostatniego treningu pod wybranym treningiem w addTraining+
//edycja treninigów+
//biblioteka ćwiczeń +
//kalendarz +
//dodać ikonki ćwiczeń (dłuższa sprawa z powodu przekształcenia całego pliku Excercises.ts) MuscleWiki, ExRx.net, lub Strength Level, Vecteezy lub Iconfinder,DALL-E +
//dodać odświeżanie przy przeciągnieciu do góry +
//dostosowac statystyki do wybranego przedziału dni/miesiecy/lat +
//dodać filtr w history do szukania po ćwiczeniu lub treningu +
//modal when training is added successfully? +
//osobna tab z pomiarami ciała +
//implement deleting trenings from history tab +