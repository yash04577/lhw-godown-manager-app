import axios from "axios";
import { inwardSlipApiPath, outawrdSlipApiPath, outwardSlipFiltersApiPath } from "../apiRoutes";
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
        console.log("inward data ", data)
        return data
    } catch (error) {
        console.log("error on inward login api ", error)
    }
}


// export const getOutwardSlipFilters = async(query:any) =>{
//     try {
//         const cookie = await getCookie();
//         const {data} = await axios.get(outwardSlipFiltersApiPath, {withCredentials:true, headers:{Cookie: cookie}});
//         console.log("outward filters", data)
//         return data
//     } catch (error) {
//         console.log("error on outward api ", error)
//     }
// }

