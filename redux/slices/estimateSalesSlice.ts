import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from "../api/authApi";
import { getOutwardSlip, getOutwardSlipFilters } from "../api/outwardApi";
import { getInwarddSlip } from "../api/inwardApi";
import { generateBillApi, getCustomersForSalesApi, getCustomersOrdersForSalesApi, getEstimateSales, getNextBillNosApi, getSalesBillApi, getSalesFilterApi, getVouchersApi } from "../api/estimateSalesApi";


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
    customers: [],
    items: [],
    voucher: [],
    billNumber: "",
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
            // console.log("query slice", query)
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

export const getCustomersForSalesAsync: any = createAsyncThunk(
    "getCustomersForSalesAsync",
    async (query) => {
        try {
            const response: any = await getCustomersForSalesApi(query);
            // console.log("query slice", response)
            return response;
        }
        catch (err) {
            console.log("error on customer slice ", err)
        }
    }
)

export const getCustomersOrdersForSalesAsync: any = createAsyncThunk(
    "getCustomersOrdersForSalesAsync",
    async (query) => {
        try {
            const response: any = await getCustomersOrdersForSalesApi(query);
            // console.log("query slice", response)
            return response;
        }
        catch (err) {
            console.log("error on customer slice ", err)
        }
    }
)


export const getVoucherAsync: any = createAsyncThunk(
    "getVoucherAsync",
    async (query) => {
        try {
            const response: any = await getVouchersApi();
            // console.log("voucher slice", response)
            return response;
        }
        catch (err) {
            console.log("error on customer slice ", err)
        }
    }
)


export const getNextBillNoAsync: any = createAsyncThunk(
    "getNextBillNoAsync",
    async (voucher) => {
        try {

            // console.log("vou ", voucher)
            const response: any = await getNextBillNosApi(voucher);
            // console.log("bill number slice", response)
            return response;
        }
        catch (err) {
            console.log("error on customer slice ", err)
        }
    }
)


export const generateBillAsync: any = createAsyncThunk(
    "generateBillAsync",
    async (payload) => {
        try {

            // console.log("vou ", payload)
            const response: any = await generateBillApi(payload);
            // console.log("bill number generate", response)
            return response;
        }
        catch (err) {
            console.log("error on customer slice ", err)
        }
    }
)


export const getSalesFilterAsync: any = createAsyncThunk(
    "getSalesFilterAsync",
    async () => {
        try {

            const response: any = await getSalesFilterApi();
            // console.log("bill number filters slice", response)
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
            .addCase(getCustomersForSalesAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getCustomersForSalesAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.customers = action.payload.data;
            })
            .addCase(getCustomersOrdersForSalesAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getCustomersOrdersForSalesAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.items = action.payload;
            })
            .addCase(getVoucherAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getVoucherAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.voucher = action.payload;
            })
            .addCase(getNextBillNoAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getNextBillNoAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                // console.log("billllllllllllllll", action.payload)
                state.billNumber = action.payload;
            })
            .addCase(generateBillAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(generateBillAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                // console.log("billllllllllllllll", action.payload)
            })
            .addCase(getSalesFilterAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getSalesFilterAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                // console.log("payload   ", action.payload)
                state.filters = action.payload;
            })
           
    }

})


export default EstimateSlice.reducer
