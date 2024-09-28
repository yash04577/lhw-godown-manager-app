import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from "../api/authApi";


interface LoginState {
    user: {};
    loading: boolean;
    status: string;
  }

const initialState:LoginState = {
    user:{},
    loading:false,
    status: 'idle'
}


const saveCookie = async (cookie:any) => {
    try {
      await AsyncStorage.setItem('authCookie', cookie);
    //   console.log("cookie saved");
    } catch (e) {
      console.error('Failed to save the cookie', e);
    }
  };


export const loginUserAsync: any = createAsyncThunk(
    "loginUserAsync",
    async (loginData) => {
        try {
            const response: any = await loginUser(loginData);
            // console.log("ressssss", response)
            const cookie = response.token;
            await saveCookie(cookie);
            await AsyncStorage.setItem("loginData", JSON.stringify(response.loginData))
            return response;
        }
        catch (err) {
            console.log("error on login slice ", err)
        }
    }
)

export const LoginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.user = action.payload.loginData;
            })
    }

})


export default LoginSlice.reducer
