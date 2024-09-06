import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from "../api/authApi";
import { getOutwardSlip, getOutwardSlipFilters } from "../api/outwardApi";
import { getInwarddSlip } from "../api/inwardApi";
import { getEstimateSales, getSalesBillApi } from "../api/estimateSalesApi";


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
    salesBill: [],
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


export const getEstimateSalesAsync: any = createAsyncThunk(
    "getEstimateSalesAsync",
    async (query) => {
        try {
            const response: any = await getEstimateSales(query);
            // console.log("query slice", response)
            return response;
        }
        catch (err) {
            console.log("error on login slice ", err)
        }
    }
)

export const getSalesBillAsync: any = createAsyncThunk(
    "getSalesBillAsync",
    async (query) => {
        try {
            const response: any = await getSalesBillApi(query);
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

export const EstimateSlice = createSlice({
    name: 'estimateSales',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEstimateSalesAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getEstimateSalesAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.data = action.payload.data;
            })
            .addCase(getSalesBillAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getSalesBillAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.salesBill = action.payload.data;
            })
           
    }

})


export default EstimateSlice.reducer
