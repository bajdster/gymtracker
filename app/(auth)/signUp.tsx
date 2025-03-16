import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import SignInInput from '@/components/signInInput';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        console.log("UserId from AsyncStorage:", userId); // Sprawdzenie, co zwraca AsyncStorage
        
        if (userId) {
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.error("Error fetching userId from AsyncStorage:", error);
      } finally {
        setLoading(false); // Ustawienie loading na false po zakończeniu operacji
      }
    };
    checkUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.mainBox}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }


  return (
    <View style={styles.mainBox}>
      <View style={{ width: '100%', alignItems: 'center', paddingTop: 14, height: 120, justifyContent: 'center', marginTop: 10 }}>
        <Image source={require("../../assets/images/logo.png")} style={{ width: 300, height: 300 }} />
      </View>
      <SignInInput />
    </View>
  );
};

export default SignUp

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    paddingVertical: 68,
    paddingHorizontal: 14,
  },
  inputSection: {
    width: '100%',
  },
});