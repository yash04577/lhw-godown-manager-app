import { Stack } from 'expo-router';
import { useState } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Providers from './providers';

export default function RootLayout() {

  const [isVerified, setIsVerified] = useState(true);

  return (

    
      <GestureHandlerRootView>
        <Providers>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
        </Providers>
      </GestureHandlerRootView>
  );
}
