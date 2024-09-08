import axios from "axios";
import { acceptPurchaseItemApiPath, acceptedOrderDetailsPurchaseApiPath, acceptedPurchaseOrderApiPath, basePath, inwardSlipApiPath, inwardSlipFiltersApiPath, outawrdSlipApiPath, outwardSlipFiltersApiPath } from "../apiRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";


const getCookie = async () => {
    try {
      const cookie = await AsyncStorage.getItem('authCookie');
      return cookie;
    } catch (e) {
      console.error('Failed to get the cookie', e);
    }
  };


export const getInwarddSlip = async(query:any) =>{
    try {
        
        const {data} = await axios.post(inwardSlipApiPath, query);
        // console.log("inward dataaaaa ", data)
        return data
    } catch (error) {
        console.log("error on inward login api ", error)
    }
}


export const getInwardSlipFilters = async() =>{
    try {
        const {data} = await axios.get(inwardSlipFiltersApiPath);
        // console.log("inward filters", data)
        return data
    } catch (error) {
        console.log("error on outward api ", error)
    }
}


export const acceptPurchaseItem = async(payload:any) =>{
    try {
        const {data} = await axios.post(acceptPurchaseItemApiPath, payload);
        // console.log("item accepted api", data);
        return data;
    } catch (error) {
        console.log("error in accept purchase api", error);
    }
}


export const getAcceptedItemsSales = async() =>{
    try {
        const cookie = await getCookie();
        const {data} = await axios.get(`${basePath}/salesOrder/getSalesOrderCustomer/V2?orderNumber=&customerId=&page=1&limit=10`, {withCredentials:true, headers:{Cookie: cookie}});
        // console.log("outward filters", data)
        return data
    } catch (error) {
        console.log("error on outward accepted api ", error)
    }
}


export const acceptedPurchaseOrderApi = async() =>{
    try {
        const cookie = await getCookie();
        const {data} = await axios.get(acceptedPurchaseOrderApiPath, {withCredentials:true, headers:{Cookie: cookie}});
        // console.log("ye h datataaaa ", data);
        return data
    } catch (error) {
        console.log("error on accepted purchase api ", error)
    }
}


export const acceptedOrderDetailsPurchaseApi = async(payload:any) =>{
    try {
        const {data} = await axios.post(acceptedOrderDetailsPurchaseApiPath, payload);
        // console.log("item accepted api", data);
        return data;
    } catch (error) {
        console.log("error in accept purchase api", error);
    }
}