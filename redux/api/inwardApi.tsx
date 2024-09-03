import axios from "axios";
import { acceptPurchaseItemApiPath, inwardSlipApiPath, inwardSlipFiltersApiPath, outawrdSlipApiPath, outwardSlipFiltersApiPath } from "../apiRoutes";
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
        console.log("inward dataaaaa ", data)
        return data
    } catch (error) {
        console.log("error on inward login api ", error)
    }
}


export const getInwardSlipFilters = async() =>{
    try {
        const {data} = await axios.get(inwardSlipFiltersApiPath);
        console.log("inward filters", data)
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
