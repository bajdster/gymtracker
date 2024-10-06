import { Tabs } from 'expo-router';
import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#cbf078',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="home" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            headerShown:false,
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name="history" size={24} color="white" />
            ),
          }}
        />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          headerShown:false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="stats-chart-outline" size={24} color="white" />
          ),
        }}
      />
    </Tabs>
  );
}
