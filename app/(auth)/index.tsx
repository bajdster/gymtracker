import { StyleSheet, Text, TouchableOpacity,ScrollView, View, Image } from 'react-native'
import React from 'react'
import SignInInput from '@/components/signInInput'

const SignIn = () => {
  return (
    <View style={styles.mainBox}>
      <View style={{width:'100%', alignItems:'center', paddingTop:14, height:120, justifyContent:'center', marginTop:10}}>
        <Image source={require("../../assets/images/logo.png")} style={{width:300, height:300}}/>
      </View>
        <SignInInput/>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  mainBox:{
      flex:1,
      paddingVertical:68,
      paddingHorizontal:14,
  },
  inputSection:{
    width:'100%'
  },
  
})