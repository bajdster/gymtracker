import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AuthButton = ({buttonText, onSubmit}: {buttonText: string, onSubmit: ()=> void}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AuthButton

const styles = StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    button: {
      backgroundColor:"#cbf078",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      width:'100%',
      alignItems:'center'
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });