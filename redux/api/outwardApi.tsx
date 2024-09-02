import axios from "axios";
import { acceptItemApiPath, assistantApiPath, basePath, outawrdSlipApiPath, outwardSlipFiltersApiPath } from "../apiRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";


const getCookie = async () => {
    try {
      const cookie = await AsyncStorage.getItem('authCookie');
      return cookie;
    } catch (e) {
      console.error('Failed to get the cookie', e);
    }
  };


export const getOutwardSlip = async(query:any) =>{
    try {
        
        // console.log("outward query ", query)
        const {data} = await axios.post(outawrdSlipApiPath, query);
        // console.log("outward data ", data)
        return data
    } catch (error) {
        console.log("error on login api ", error)
    }
}


export const getOutwardSlipFilters = async({customer, orderNumber, salesPerson}:any) =>{
    try {
        const cookie = await getCookie();
        const {data} = await axios.get(`${basePath}/salesOrder/getPastOrderFilter/option/v2?customer=${customer ? customer : ""}&salesOrder=${orderNumber ? orderNumber : ""}&user=${salesPerson ? salesPerson : ""}`, {withCredentials:true, headers:{Cookie: cookie}});
        // console.log("outward filters", data)
        return data
    } catch (error) {
        console.log("error on outward api ", error)
    }
}

export const getAssitant = async() =>{
    try {
        const {data} = await axios.get(assistantApiPath);
        return data;
    } catch (error) {
        console.log("error in assistant api", error);
    }
}

export const acceptItem = async(payload:any) =>{
    try {
        const {data} = await axios.patch(acceptItemApiPath, payload);
        // console.log("item accepted api", data);
        return data;
    } catch (error) {
        console.log("error in accept api", error);
    }
}
