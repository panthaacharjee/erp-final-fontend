import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IGetProduct,
  IProduct,
  productState,
} from "../interfaces/productInterface";

const productInitialState: productState = {
  productLoading: false,
  productSuccess: null,
  productError: null,
  product: null,
};

interface IProductState {
  message: string;
  product: IGetProduct;
}

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    ProductRequest(state) {
      state.productLoading = true;
    },
    ProductSuccess(state, action: PayloadAction<IProductState>) {
      state.productLoading = false;
      state.product = action.payload.product;
      state.productSuccess = action.payload.message;
    },
    ProductFail(state, action: PayloadAction<string>) {
      state.productLoading = false;
      state.productSuccess = null;
      state.productError = action.payload;
    },

    ClearProductSuccess(state) {
      state.productSuccess = null;
    },
    ClearProductError(state) {
      state.productError = null;
    },

    ClearProductRefresh(state) {
      state.product = null;
    },
  },
});

export const {
  ProductRequest,
  ProductSuccess,
  ProductFail,
  ClearProductSuccess,
  ClearProductError,

  ClearProductRefresh,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
