import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, Link, useRouter, useRootNavigationState } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';



const index = () => {

    const rootNavigationState = useRootNavigationState();
    const router = useRouter();
    const token = useSelector((state:any)=>state?.user?.user)

    const getCookie = async () => {
      try {
        const cookie = await AsyncStorage.getItem('authCookie');
        return cookie;
      } catch (e) {
        console.error('Failed to get the cookie', e);
      }
    };

    useEffect(()=>{
      const cookie = getCookie();
      console.log("cookie mili ", cookie)
    },[])

  return (
    <GestureHandlerRootView>

    

    <View className='flex h-screen justify-center items-center'>
        {/* <TouchableOpacity> */}
            <Link href={"/login"}><Text>go to login page</Text></Link>

            <Text>
                Loading...........
            </Text>

        {/* </TouchableOpacity> */}
    </View>
    </GestureHandlerRootView>
  )
}

export default index

const styles = StyleSheet.create({})