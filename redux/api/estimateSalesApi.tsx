import axios from "axios";
import { basePath, billNumberApiPath, estimateSalesApiPath, generateBillApiPath, getSalesFilterApiPath, inwardSlipApiPath, outawrdSlipApiPath, outwardSlipFiltersApiPath, salesBillApiPath, updateDispatchQtyApiPath, voucherApiPath } from "../apiRoutes";
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


export const getVouchersApi = async() =>{
    try {
        
        const {data} = await axios.get(voucherApiPath);
        // console.log("inward data ", data)
        return data
    } catch (error) {
        console.log("error on customer api ", error)
    }
}


export const getNextBillNosApi = async(voucher:any) =>{
    try {
        
        // console.log("voucher ", voucher)
        const {data} = await axios.get(`${billNumberApiPath}/${voucher}`);
        // console.log("bill number ", data)
        return data
    } catch (error) {
        console.log("error on bill number ", error)
    }
}


export const generateBillApi = async(query:any) =>{
    try {
        
        const {data} = await axios.post(generateBillApiPath, query);
        // console.log("bill data ", data)
        return data
    } catch (error) {
        console.log("error on bill api ", error)
    }
}


export const updateDispatchQtyApi = async(query:any) =>{
    try {
        
        console.log("payloadddd ", query)
        const {data} = await axios.patch(`${updateDispatchQtyApiPath}/${query.id}`, query);
        console.log("update dispatch api ", data)
        return data
    } catch (error) {
        console.log("error on bill api ", error)
    }
}


export const getSalesFilterApi = async() =>{
    try {
        
        const {data} = await axios.get(getSalesFilterApiPath);
        // console.log("bill data filters ", data)
        return data
    } catch (error) {
        console.log("error on bill api ", error)
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

