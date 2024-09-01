import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Link, Navigator, useNavigation, useRouter } from "expo-router";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "@/redux/slices/loginSlice";

const login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loggedIn = useSelector((state:any)=>state?.user?.Status)

  useEffect(()=>{
    loggedIn == "completed" && router.push("/(tabs)")
  },[loggedIn])

  const handleLogin = async() => {
    if (!email || !password) {
      Alert.alert("Enter Email And Password");
    } else {
      dispatch(
        loginUserAsync({
          email: email,
          password: password,
        })
      );
      Alert.alert("Login Sucess");
      router.push("/(tabs)")
    }
  };

  return (
    <View className={"flex-1 justify-center items-center bg-gray-100"}>
      <Text className={"text-2xl font-bold mb-6"}>Login</Text>

      <TextInput
        className={"w-3/4 p-3 mb-4 bg-white rounded shadow"}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className={"w-3/4 p-3 mb-6 bg-white rounded shadow"}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className={"w-3/4 p-3 bg-blue-500 rounded shadow"}
        onPress={handleLogin}
      >
        <Text className={"text-white text-center font-bold"}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({});
