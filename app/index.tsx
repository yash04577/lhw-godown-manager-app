import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, Link, useRouter, useRootNavigationState } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkLogin } from '@/redux/api/authApi';



const index = () => {

    const rootNavigationState = useRootNavigationState();
    const router = useRouter();
    const token = useSelector((state:any)=>state?.user?.user)

    const checkAuth = async () => {
      try {
        const token:any = await AsyncStorage.getItem('authCookie');
        const {data} = await checkLogin({token: token});
        // console.log("auth res ", data);

        if(data?.success){
          // console.log("user is valid");
          router.push("/(tabs)/")
        }
        else{
          // console.log("invalid user")
          router.push("/login")
        }

      } catch (e) {
        // console.error('Failed to get the cookie', e);
        router.push("/login")
      }
    };

    useEffect(()=>{
      
      // if(authCookie){
      //   router.push("/(tabs)");
      // }

      checkAuth();
  
    },[])

  return (
    <GestureHandlerRootView>

      <View className='w-screen h-screen flex justify-center items-center'>
        <ActivityIndicator size={100} />
        <Text>Loading...</Text>
      </View>

    
    </GestureHandlerRootView>
  )
}

export default index

const styles = StyleSheet.create({})