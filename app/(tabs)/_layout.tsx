import { Tabs } from 'expo-router';
import React from 'react';
import {View, Image} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <View style={{width:'100%', alignItems:'center', paddingTop:14, height:100, justifyContent:'center', marginTop:10}}>
        <Image source={require("../../assets/images/logo.png")} style={{width:150, height:70}}/>
      </View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#cbf078',
          tabBarInactiveTintColor: 'white',
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
            name="history"
            options={{
              title: 'Historia',
              headerShown:false,
              tabBarIcon: ({ color, focused }) => (
                <FontAwesome name="history" size={24} color={color}/>
              ),
            }}
          />
          <Tabs.Screen
            name="measurement"
            options={{
              title: 'Pomiary',
              headerShown:false,
              tabBarIcon: ({ color, focused }) => (
                <Entypo name="ruler" size={24} color={color} />
              ),
            }}
          />
        <Tabs.Screen
          name="statistics"
          options={{
            title: 'Statystyki',
            headerShown:false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="stats-chart-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Calendar"
          options={{
            title: 'Kalendarz',
            headerShown:false,
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name="calendar" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
