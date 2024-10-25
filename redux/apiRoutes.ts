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
export const acceptedOrderDetailsPurchaseApiPath = `${basePath}/purchaseOrder/getPurchaseOrderCustomerWithItem`;


//sales section
export const estimateSalesApiPath = `${basePath}/sales/bill/v2`;
export const salesBillApiPath = `${basePath}/sales/bill`;
export const purchaseBillApiPath = `${basePath}/purchaser/pages/bill/`;
export const voucherApiPath = `${basePath}/voucher`
export const billNumberApiPath = `${basePath}/sales/bill/billNumber`;
export const generateBillApiPath = `${basePath}/sales/bill`
export const getSalesFilterApiPath = `${basePath}/salesOrder/getPastOrderFilter/option`


//purchase section
export const estimatePurchaseApiPath = `${basePath}/purchaser/pages/bill/all`;
export const getPurchaseCustomerApiPath = `${basePath}/https://www.lohawalla.com/sales/pages/customer//getAllCustomerForPurchase/v2?page=1&limit=10&search=`
export const getPurchaseByCustomerApiPath = `${basePath}/purchaseOrder/byCustomer/complete/`
export const purchaseBillNumberApiPath = `${basePath}/purchaser/pages/bill/billNumber/`;
export const generatePurchaseBillApiPath = `${basePath}/purchaser/pages/bill`;