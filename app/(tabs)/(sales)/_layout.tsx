import { Stack } from 'expo-router';
import { useState } from 'react';
import 'react-native-reanimated';

export default function RootLayout() {

  return (

    
      
        
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="salesBill" options={{ headerShown: false }} />
        {/* <Stack.Screen name="orderDetail" options={{ headerShown: false }} /> */}
      </Stack>
  );
}
