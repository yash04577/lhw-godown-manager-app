import axios from "axios";
import { loginApiPath } from "../apiRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveCookie = async (cookie:any) => {
    try {
      await AsyncStorage.setItem('authCookie', cookie[0]);
    } catch (e) {
      console.error('Failed to save the cookie', e);
    }
  };

export const loginUser = async(loginData:any) =>{
    try {
        const response = await axios.post(loginApiPath, loginData, {withCredentials:true});
        const cookie = response.headers['set-cookie']; // Extract cookie from response headers
        await saveCookie(cookie); // Save the cookie
        // console.log("login data ", response.data)
        return response.data
    } catch (error) {
        console.log("error on login api ", error)
    }
}