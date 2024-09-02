import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from "../api/authApi";
import { getOutwardSlip, getOutwardSlipFilters } from "../api/outwardApi";
import { getInwarddSlip } from "../api/inwardApi";


interface LoginState {
    user: {};
    loading: boolean;
    status: string;
  }

const initialState = {
    data:{},
    filters: {},
    loading:false,
    filterLoading:false,
    status: 'idle'
}


const saveCookie = async (cookie:any) => {
    try {
      await AsyncStorage.setItem('authCookie', cookie);
    } catch (e) {
      console.error('Failed to save the cookie', e);
    }
  };

  const getCookie = async () => {
    try {
      const cookie = await AsyncStorage.getItem('authCookie');
      return cookie;
    } catch (e) {
      console.error('Failed to get the cookie', e);
    }
  };


export const getInwardSlipAsync: any = createAsyncThunk(
    "getInwardSlipAsync",
    async (query) => {
        try {
            const response: any = await getInwarddSlip(query);
            // console.log("query slice", response)
            return response;
        }
        catch (err) {
            console.log("error on login slice ", err)
        }
    }
)

// export const getOutwardSlipFiltersAsync: any = createAsyncThunk(
//     "getOutwardSlipFiltersAsync",
//     async (query) => {
//         try {
//             const response: any = await getOutwardSlipFilters(query);
//             console.log("filter slice", response)
//             return response;
//         }
//         catch (err) {
//             console.log("error on login slice ", err)
//         }
//     }
// )

export const InwardSlice = createSlice({
    name: 'inward',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInwardSlipAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getInwardSlipAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.data = action.payload.data;
            })
           
    }

})


export default InwardSlice.reducer
