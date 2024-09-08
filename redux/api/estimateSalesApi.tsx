import axios from "axios";
import { basePath, estimateSalesApiPath, inwardSlipApiPath, outawrdSlipApiPath, outwardSlipFiltersApiPath, salesBillApiPath } from "../apiRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";


const getCookie = async () => {
    try {
      const cookie = await AsyncStorage.getItem('authCookie');
      return cookie;
    } catch (e) {
      console.error('Failed to get the cookie', e);
    }
  };


export const getEstimateSales = async(query:any) =>{
    try {
        
        const {data} = await axios.post(estimateSalesApiPath, query);
        // console.log("inward data ", data)
        return data
    } catch (error) {
        console.log("error on inward login api ", error)
    }
}


export const getSalesBillApi = async({id}:any) =>{
    try {
        
        const {data} = await axios.get(`${salesBillApiPath}/${id}`);
        // console.log("inward data ", data)
        return data
    } catch (error) {
        console.log("error on inward login api ", error)
    }
}

export const getCustomersForSalesApi = async({query}:any) =>{
    try {
        
        const {data} = await axios.get(`${basePath}/sales/pages/customer/getAllCustomerForSales/v2?page=1&limit=10&search=${query}`);
        // console.log("inward data ", data)
        return data
    } catch (error) {
        console.log("error on customer api ", error)
    }
}


export const getCustomersOrdersForSalesApi = async({customerId}:any) =>{
    try {
        
        const {data} = await axios.get(`${basePath}/salesOrder/byCustomer/complete/${customerId}`);
        // console.log("inward data ", data)
        return data
    } catch (error) {
        console.log("error on customer api ", error)
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

