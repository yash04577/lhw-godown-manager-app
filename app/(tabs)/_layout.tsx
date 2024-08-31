import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
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
          title: 'Outward Slip',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="arrow-outward" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inwardSlip"
        options={{
          title: 'Inward Slip',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ transform: [{ rotate: '180deg' }] }}>
            <MaterialIcons name="arrow-outward" size={24} color={color} />
          </View>
          ),
        }}
      />
      <Tabs.Screen
        name="estimateSales"
        options={{
          title: 'Estimate Sales',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="attach-money" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="estimatePurchase"
        options={{
          title: 'Estimate Purchase',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="money-off" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
