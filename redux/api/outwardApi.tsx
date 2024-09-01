import axios from "axios";
import { outawrdSlipApiPath, outwardSlipFiltersApiPath } from "../apiRoutes";
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
        
        console.log("outward query ", query)
        const {data} = await axios.post(outawrdSlipApiPath, query);
        console.log("outward data ", data)
        return data
    } catch (error) {
        console.log("error on login api ", error)
    }
}


export const getOutwardSlipFilters = async(query:any) =>{
    try {
        const cookie = await getCookie();
        const {data} = await axios.get(outwardSlipFiltersApiPath, {withCredentials:true, headers:{Cookie: cookie}});
        console.log("outward filters", data)
        return data
    } catch (error) {
        console.log("error on outward api ", error)
    }
}

