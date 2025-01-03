import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { View } from 'react-native';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Outward',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="arrow-outward" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(inward)"
        options={{
          title: 'Inward',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ transform: [{ rotate: '180deg' }] }}>
            <MaterialIcons name="arrow-outward" size={24} color={color} />
          </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(sales)"
        options={{
          title: 'Sales',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="attach-money" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(purchase)"
        options={{
          title: 'Purchase',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="money-off" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="supervised-user-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
