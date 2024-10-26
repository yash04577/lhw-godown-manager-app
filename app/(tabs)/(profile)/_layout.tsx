import { Stack } from 'expo-router';
import { useState } from 'react';
import 'react-native-reanimated';

export default function RootLayout() {

  return (

    
      
        
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        {/* <Stack.Screen name="../(tabs)/(inward)/" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="orderDetail" options={{ headerShown: false }} /> */}
      </Stack>
  );
}
