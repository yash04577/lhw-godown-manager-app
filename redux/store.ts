import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import outwardReducer from "./slices/outwardSlice";
import inwardReducer from "./slices/inwardSlice";
import estimateSalesReducer from "./slices/estimateSalesSlice";
import purchaseReducer from "./slices/estimatePurchaseSlice";

export const store=configureStore({
    reducer:{
       user: loginReducer,
       outward: outwardReducer,
       inward: inwardReducer,
       estimateSales: estimateSalesReducer,
       purchase: purchaseReducer,
    }
})