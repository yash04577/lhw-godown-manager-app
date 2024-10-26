import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRouter } from 'expo-router';

const index = ({navigator:any}) => {

    const [data, setData] = useState();
    const router = useRouter();
    const navigation = useNavigation();

    const getData = async() =>{
        const res:any = await AsyncStorage.getItem("loginData");
        const parsedData = await JSON.parse(res);
        setData(parsedData);

    }

    const handleLogout = async() =>{
        await AsyncStorage.clear();
        router.push("login")
        // router.push("../(tabs)/(inward)/")
        // router.push("../")

    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <View className='h-screen w-screen flex justify-center items-center bg-gray-100'>
    <View className='bg-white p-6 rounded-lg shadow-lg'>
        <View className='mb-4'>
            <View className='flex flex-row gap-3'>
                <Text className='font-semibold text-gray-700'>Name:</Text>
                <Text className='text-gray-900'>{data?.name}</Text>
            </View>
        </View>
        <View className='mb-4'>
            <View className='flex flex-row gap-3'>
                <Text className='font-semibold text-gray-700'>Email:</Text>
                <Text className='text-gray-900'>{data?.email}</Text>
            </View>
        </View>
        <View className='mb-4'>
            <View className='flex flex-row gap-3'>
                <Text className='font-semibold text-gray-700'>Phone:</Text>
                <Text className='text-gray-900'>{data?.phoneNumber}</Text>
            </View>
        </View>
        <View className='mb-4'>
            <View className='flex flex-row gap-3'>
                <Text className='font-semibold text-gray-700'>Role:</Text>
                <Text className='text-gray-900'>{data?.role}</Text>
            </View>
        </View>
        <View className='mb-4'>
            <View className='flex flex-row gap-3'>
                <Text className='font-semibold text-gray-700'>Godown:</Text>
                <Text className='text-gray-900'>{data?.GodownName}</Text>
            </View>
        </View>
        <View className='mt-6'>
            <TouchableOpacity onPress={handleLogout} className='bg-red-500 px-4 py-2 rounded-lg'>
                <Text className='text-white font-bold'>Logout</Text>
            </TouchableOpacity>
        </View>
    </View>
</View>

  )
}

export default index

const styles = StyleSheet.create({})