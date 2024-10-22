import axios from "axios";
import { estimatePurchaseApiPath, getPurchaseByCustomerApiPath, purchaseBillApiPath, } from "../apiRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";


const getCookie = async () => {
    try {
      const cookie = await AsyncStorage.getItem('authCookie');
      return cookie;
    } catch (e) {
      console.error('Failed to get the cookie', e);
    }
  };


export const getEstimatePurchase = async(query:any) =>{
    try {
        
        const {data} = await axios.post(estimatePurchaseApiPath, query);
        // console.log("inward data ", data)
        return data
    } catch (error) {
        console.log("error on inward login api ", error)
    }
}

export const getPurchaseBillApi = async({id}:any) =>{
  try {
      
      const {data} = await axios.get(`${purchaseBillApiPath}/${id}`);
      // console.log("inward data ", data)
      return data
  } catch (error) {
      console.log("error on inward login api ", error)
  }
}

export const getPurchaseCustomerApi = async({page, limit, search}:any) =>{
  try {
      
      const {data} = await axios.get(`https://www.lohawalla.com/sales/pages/customer/getAllCustomerForPurchase/v2?page=1&limit=20&search=${search}`);
      console.log("purchase customer ", data)
      return data
  } catch (error) {
      console.log("error on inward login api ", error)
  }
}


export const getPurchaseByCustomerApi = async({id}:any) =>{
  try {
      
      const {data} = await axios.get(`${getPurchaseByCustomerApiPath}/${id}`);
      console.log("purchase customer id ", data)
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

