export const basePath = `https://www.lohawalla.com`;


//auth api
export const loginApiPath = `${basePath}/auth/LogIn/companyLogIn/companyUserLogin`;



//outward section apis
export const outawrdSlipApiPath = `${basePath}/salesOrder/forGodown`;
export const outwardSlipFiltersApiPath = `${basePath}/salesOrder/getPastOrderFilter/option/v2?customer=&salesOrder=&user=`;
export const assistantApiPath = `${basePath}/manager/Godown/Assistant/assistant`;
export const acceptItemApiPath = `${basePath}/salesOrder/getAccept`;
export const acceptedOrderDetailsSalesApiPath = `${basePath}/salesOrder/getSalesOrderCustomerWithItem`


//inward section apis
export const inwardSlipApiPath = `${basePath}/purchaseOrder/all/purchaseOrderSlip/v2`;
export const inwardSlipFiltersApiPath = `${basePath}/salesOrder/getPastOrderFilter/PurchaseOrderOption`;
export const acceptPurchaseItemApiPath = `${basePath}/purchaseOrder/accpet/Slip`;
export const acceptedPurchaseOrderApiPath = `${basePath}/purchaseOrder/getPurchaseOrderCustomer`;


//sales section
export const estimateSalesApiPath = `${basePath}/sales/bill/v2`;
export const salesBillApiPath = `${basePath}/sales/bill`;
export const purchaseBillApiPath = `${basePath}/purchaser/pages/bill/`;



export const estimatePurchaseApiPath = `${basePath}/purchaser/pages/bill/all`;