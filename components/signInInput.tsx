import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import AuthButton from './authButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { auth } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInInput = () => {

  const [loginMode, setLoginMode] = useState<Boolean>(true)
  const [credentails, setCredentials] = useState({
    email: '',
    password:''
  })

  const authModeHandler = () =>
  {
    setLoginMode((prev)=>
    {
      return !prev
    })
  }

  const authOparationHandler = (text: string, input: keyof typeof credentails) => {
    setCredentials((prev) => ({
      ...prev,
      [input]: text,
    }));
  };

  const getUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId !== null) {
        console.log('ID użytkownika z AsyncStorage:', userId);
      } else {
        console.log('Brak zapisanych danych użytkownika w AsyncStorage');
      }
    } catch (error) {
      console.error('Błąd przy pobieraniu danych z AsyncStorage:', error);
    }
  };

  const submitHandler = async () => {
    if (loginMode) {
      // Logowanie
      try {
        const userCredential = await signInWithEmailAndPassword(auth, credentails.email, credentails.password);
        console.log("Zalogowano:", userCredential.user);
  
        // Pobranie userId
        const userId = userCredential.user.uid;
  
        // Zapisanie userId do AsyncStorage
        await AsyncStorage.setItem("userId", userId);
  
        // Dalsza logika po zalogowaniu (np. przekierowanie do innej strony)
        console.log("Zalogowany użytkownik ID:", userId);
      } catch (error) {
        console.error("Błąd logowania:", error.message);
      }
    } else {
      // Rejestracja
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, credentails.email, credentails.password);
        console.log("Zarejestrowano:", userCredential.user);
  
        // Pobranie userId
        const userId = userCredential.user.uid;
  
        // Zapis danych użytkownika do Firebase Realtime Database (lub Firestore)
        const userData = {
          email: credentails.email,
          // Inne dane użytkownika
        };
  
        // Przechowywanie userId w pamięci (np. w stanie, AsyncStorage, Context API, Redux)
        await AsyncStorage.setItem("userId", userId);
  
        // Zapisanie danych użytkownika
        const response = await fetch(`https://gymtracker-c5f99-default-rtdb.firebaseio.com/users.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response.ok) {
          console.log("Dane użytkownika zostały zapisane w bazie danych.");
        } else {
          console.error("Błąd podczas zapisywania danych użytkownika:", response.status);
        }
      } catch (error) {
        console.error("Błąd rejestracji:", error.message);
      }
    }
  };
  
  

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={styles.scrollView} 
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inputBox}>
            {loginMode ? <Text style={styles.title}>Zaloguj</Text>: <Text style={styles.title}>Zarejestruj</Text>}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email: </Text>
              <TextInput 
                style={styles.input} 
                placeholder="Wpisz email" 
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize="none"
                value={credentails.email}
                onChangeText={(text) => authOparationHandler(text, 'email')}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Hasło: </Text>
              <TextInput 
                style={styles.input} 
                placeholder="Wpisz hasło" 
                placeholderTextColor="#ccc" 
                secureTextEntry 
                onChangeText={(text) => authOparationHandler(text, 'password')}
                value={credentails.password} 
              />
            </View>

            {!loginMode && <View style={styles.inputContainer}>
              <Text style={styles.label}>Powtórz hasło: </Text>
              <TextInput 
                style={styles.input} 
                placeholder="Wpisz hasło" 
                placeholderTextColor="#ccc" 
                secureTextEntry 
              />
            </View>}

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Zapomniałem hasła</Text>
            </TouchableOpacity>

            <AuthButton buttonText = {loginMode ? "Zaloguj" : 'Zarejestruj się'} onSubmit = {submitHandler}/>

            <View style={styles.SMBox}>
              <TouchableOpacity>
                <AntDesign name="google" size={24} color="#d3d6db" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo name="facebook-with-circle" size={24} color="#d3d6db" />
              </TouchableOpacity>
            </View>

            <View style={styles.changeAuthModeBox}>
              {loginMode ? 
              <>
              <Text style={{color:'white'}}>Nie masz jeszcze konta?</Text>
                <TouchableOpacity style={{marginLeft:5}} onPress={authModeHandler}>
                  <Text style={{color:'#cbf078', fontWeight:'bold'}}>Zarejestruj</Text>
                </TouchableOpacity>
              </>: 
              <>
                <Text style={{color:'white'}}>Posiadasz już konto?</Text>
                <TouchableOpacity style={{marginLeft:5}} onPress={authModeHandler}>
                  <Text style={{color:'#cbf078', fontWeight:'bold'}}>Zaloguj</Text>
                </TouchableOpacity>
              </>
              }
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignInInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputBox: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#222831',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    height: 46,
    backgroundColor: '#596e79',
    borderRadius: 8,
    color: 'white',
    paddingHorizontal: 10,
  },
  forgotPassword: {
    color: 'white',
    textAlign: 'right',
    marginTop: 10,
    textDecorationLine:'underline'
  },
  SMBox:{
    width:'100%',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:20
  },
  changeAuthModeBox:{
    flexDirection:'row',
    marginTop:25,
    justifyContent:'center'
  }
});
