import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from "../api/authApi";
import { getAcceptedOrderDetailsSales, getOutwardSlip, getOutwardSlipFilters } from "../api/outwardApi";
import { acceptPurchaseItem, getInwardSlipFilters, getInwarddSlip } from "../api/inwardApi";


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
    status: 'idle',
    refreshData:false,
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

export const getInwardSlipFiltersAsync: any = createAsyncThunk(
    "getInwardSlipFiltersAsync",
    async () => {
        try {
            const response: any = await getInwardSlipFilters();
            console.log("inward filter slice", response)
            return response;
        }
        catch (err) {
            console.log("error on login slice ", err)
        }
    }
)

export const acceptPurchaseItemAsync: any = createAsyncThunk(
    "acceptPurchaseItemAsync",
    async (payload) => {
        try {
            const response: any = await acceptPurchaseItem(payload);
            // console.log("accept item slice res ", response);
            return response;
        }
        catch (err) {
            console.log("error on accept item slice ", err)
        }
    }
)




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
            .addCase(getInwardSlipFiltersAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getInwardSlipFiltersAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                // console.log("action payload ", action.payload)
                state.filters = action.payload;
            })
            .addCase(acceptPurchaseItemAsync.pending, (state) => {
                state.status = 'loading'
                state.refreshData = false;
            })
            .addCase(acceptPurchaseItemAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.refreshData = true;
            }) 
           
    }

})


export default InwardSlice.reducer
