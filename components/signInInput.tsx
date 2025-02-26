import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';

const SignInInput = () => {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.title}>Zaloguj</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Wpisz email" placeholderTextColor="#ccc"/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hasło</Text>
        <TextInput style={styles.input} placeholder="Wpisz hasło" placeholderTextColor="#ccc" secureTextEntry />
      </View>
      
    </View>
    //Ikonki szybkiego logowania google, facebook 
  );
};

export default SignInInput;

const styles = StyleSheet.create({
  inputBox: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#222831',
    borderRadius: 10,
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
});
