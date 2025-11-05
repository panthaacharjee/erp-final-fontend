import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import tabReducer from "./reducers/tabReducer";
import { hrSalaryReducer, hrUserReducer } from "./reducers/HrReducer";
import {
  businessReducer,
  processReducer,
  productDetailReducer,
} from "./reducers/businessReducer";
import {
  productReducer,
  sampleProductReducer,
} from "./reducers/productReducer";
import { orderReducer } from "./reducers/orderReducer";
// Import other reducers

const rootReducer = combineReducers({
  user: userReducer,
  tab: tabReducer,
  hr: hrUserReducer,
  salary: hrSalaryReducer,
  organization: businessReducer,
  product_details: productDetailReducer,
  process: processReducer,
  product: productReducer,
  sampleProduct: sampleProductReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
