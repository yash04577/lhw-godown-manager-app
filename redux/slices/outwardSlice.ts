import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from "../api/authApi";
import { acceptItem, getAcceptedOrderDetailsSales, getAcceptedOrderSalesByCustomer, getAcceptedOrderSalesByCustomerFilter, getAssitant, getOutwardSlip, getOutwardSlipFilters } from "../api/outwardApi";
import { getAcceptedItemsSales } from "../api/inwardApi";


interface LoginState {
    user: {};
    loading: boolean;
    status: string;
  }

const initialState = {
    data:{},
    filters: {},
    assistant: [],
    loading:false,
    filterLoading:false,
    status: 'idle',
    refreshData:false,
    acceptedOrder:[],
    orderDetail:{},
    customer: [],
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


export const getOutwardSlipAsync: any = createAsyncThunk(
    "getOutwardSlipAsync",
    async (query) => {
        try {
            const response: any = await getOutwardSlip(query);
            // console.log("query slice", response)
            return response;
        }
        catch (err) {
            console.log("error on login slice ", err)
        }
    }
)

export const getOutwardSlipFiltersAsync: any = createAsyncThunk(
    "getOutwardSlipFiltersAsync",
    async (query) => {
        try {
            const response: any = await getOutwardSlipFilters(query);
            // console.log("filter slice async", response)
            return response;
        }
        catch (err) {
            console.log("error on login slice ", err)
        }
    }
)


export const getAssistantAsync: any = createAsyncThunk(
    "getAssistantAsync",
    async () => {
        try {
            const response: any = await getAssitant();
            return response;
        }
        catch (err) {
            console.log("error on assistant slice ", err)
        }
    }
)

export const acceptItemAsync: any = createAsyncThunk(
    "acceptItemAsync",
    async (payload) => {
        try {
            const response: any = await acceptItem(payload);
            // console.log("accept item slice res ", response);
            return response;
        }
        catch (err) {
            console.log("error on accept item slice ", err)
        }
    }
)

export const getAcceptedItemsSalesAsync: any = createAsyncThunk(
    "getAcceptedItemsSalesAsync",
    async (payload) => {
        try {
            const response: any = await getAcceptedItemsSales();
            // console.log("items mile ", response);
            return response;
        } catch (error) {
            console.log("error on get accept item slice ", error)
        }
    }
)

export const getAcceptedOrderDetailsSalesAsync: any = createAsyncThunk(
    "getAcceptedOrderDetailsSalesAsync",
    async (query) => {
        try {
            const response: any = await getAcceptedOrderDetailsSales(query);
            // console.log("query slice", response)
            return response;
        }
        catch (err) {
            console.log("error on login slice ", err)
        }
    }
)


export const getAcceptedOrderSalesByCustomerAsync: any = createAsyncThunk(
    "getAcceptedOrderSalesByCustomerAsync",
    async (query) => {
        try {
            const response: any = await getAcceptedOrderSalesByCustomer(query);
            return response;
        }
        catch (err) {
            console.log("error on login slice ", err)
        }
    }
)


export const getAcceptedOrderSalesByCustomerFilterAsync: any = createAsyncThunk(
    "getAcceptedOrderSalesByCustomerFilterAsync",
    async (query) => {
        try {
            const response: any = await getAcceptedOrderSalesByCustomerFilter(query);
            return response;
        }
        catch (err) {
            console.log("error on login slice ", err)
        }
    }
)


export const OutwardSlice = createSlice({
    name: 'outward',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOutwardSlipAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getOutwardSlipAsync.fulfilled, (state, action) => {
                state.status = 'completed',
                state.data = action.payload.data;
            })
            .addCase(getOutwardSlipFiltersAsync.pending, (state) => {
                state.filterLoading = true;
            })
            .addCase(getOutwardSlipFiltersAsync.fulfilled, (state, action) => {
                state.filterLoading = false;
                state.filters = action.payload;
            })
            .addCase(getAssistantAsync.pending, (state) => {
                state.filterLoading = true;
            })
            .addCase(getAssistantAsync.fulfilled, (state, action) => {
                state.filterLoading = false;
                state.assistant = action.payload.data;
            })
            .addCase(acceptItemAsync.pending, (state) => {
                state.filterLoading = true;
                state.refreshData = false;
            })
            .addCase(acceptItemAsync.fulfilled, (state, action) => {
                state.filterLoading = false;
                state.refreshData = true;
            })
            .addCase(getAcceptedItemsSalesAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAcceptedItemsSalesAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.acceptedOrder = action?.payload?.data?.salesOrders
            })
            .addCase(getAcceptedOrderDetailsSalesAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAcceptedOrderDetailsSalesAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.orderDetail = action.payload.data
            })
            .addCase(getAcceptedOrderSalesByCustomerAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAcceptedOrderSalesByCustomerAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.customer = action.payload.Customer
                // console.log("oooooooooooooo ", action.payload.Customer)
            })
            .addCase(getAcceptedOrderSalesByCustomerFilterAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAcceptedOrderSalesByCustomerFilterAsync.fulfilled, (state, action) => {
                state.status = 'completed'
                state.acceptedOrder = action?.payload?.data?.salesOrders
                // console.log("oooooooooooooo ", action.payload.Customer)
            })
    }

})


export default OutwardSlice.reducer
