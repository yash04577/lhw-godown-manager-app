import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEstimatePurchase } from "../api/estimatePurchaseApi";


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


export const getEstimatePurchaseAsync: any = createAsyncThunk(
    "getEstimatePurchaseAsync",
    async (query) => {
        try {
            const response: any = await getEstimatePurchase(query);
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

export const PurchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEstimatePurchaseAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getEstimatePurchaseAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.data = action.payload.data;
            })
           
    }

})


export default PurchaseSlice.reducer
