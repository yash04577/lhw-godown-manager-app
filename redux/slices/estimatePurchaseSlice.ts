import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generatePurchaseBillApi, getEstimatePurchase, getNextBillNoPurchaseApi, getPurchaseBillApi, getPurchaseByCustomerApi, getPurchaseCustomerApi } from "../api/estimatePurchaseApi";


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
    purchaseBill:{},
    purchaseCustomer: {},
    customerOrder: {},
    nextBillNumber: {},
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


export const getPurchaseBillAsync: any = createAsyncThunk(
  "getPurchaseBillAsync",
  async (query) => {
      try {
          const response: any = await getPurchaseBillApi(query);
          // console.log("query slice", response)
          return response;
      }
      catch (err) {
          console.log("error on login slice ", err)
      }
  }
)


export const getPurchaseCustomerAsync: any = createAsyncThunk(
  "getPurchaseCustomerAsync",
  async (query) => {
      try {
          const response: any = await getPurchaseCustomerApi(query);
        //   console.log("purchase slic customer", response);
          return response;
      }
      catch (err) {
          console.log("error on login slice ", err)
      }
  }
)


export const getPurchaseByCustomerAsync: any = createAsyncThunk(
  "getPurchaseByCustomerAsync",
  async (query) => {
      try {
          const response: any = await getPurchaseByCustomerApi(query);
        //   console.log("purchase slic customer id", response);
          return response;
      }
      catch (err) {
          console.log("error on login slice ", err)
      }
  }
)


export const getNextBillNoPurchaseAsync: any = createAsyncThunk(
    "getNextBillNoPurchaseAsync",
    async (voucher) => {
        try {

            // console.log("vou ", voucher)
            const response: any = await getNextBillNoPurchaseApi(voucher);
            // console.log("bill number slice purchase", response)
            return response;
        }
        catch (err) {
            console.log("error on customer slice ", err)
        }
    }
)

export const generatePurchaseBillAsync: any = createAsyncThunk(
    "generatePurchaseBillAsync",
    async (payload) => {
        try {

            // console.log("vou ", payload)
            const response: any = await generatePurchaseBillApi(payload);
            // console.log("bill number generate", response)
            return response;
        }
        catch (err) {
            console.log("error on customer slice ", err)
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
            .addCase(getPurchaseBillAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getPurchaseBillAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.purchaseBill = action.payload.data;
                // console.log("purchase billl state ", action.payload)
            })
            .addCase(getPurchaseCustomerAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getPurchaseCustomerAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.purchaseCustomer = action.payload.data;
                // console.log("purchase customer state ", action.payload)
            })
            .addCase(getPurchaseByCustomerAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getPurchaseByCustomerAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.customerOrder = action.payload.data;
                // console.log("purchase customer state id ", action.payload)
            })
            .addCase(getNextBillNoPurchaseAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getNextBillNoPurchaseAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.nextBillNumber = action.payload;
                // console.log("purchase customer state id ", action.payload)
            })
            .addCase(generatePurchaseBillAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(generatePurchaseBillAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                // console.log("purchase bill generated state id ", action.payload)
            })
           
    }

})


export default PurchaseSlice.reducer
