import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGetProduct, productState } from "../interfaces/productInterface";

const productInitialState: productState = {
  productLoading: false,
  productSuccess: null,
  productError: null,

  processLoading: false,
  processSuccess: null,
  processError: null,

  upDownLoading: false,
  upDownSuccess: null,
  upDownError: null,

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

    CreateProductProcessRequest(state) {
      state.processLoading = true;
    },
    CreateProductProcessSucess(state, action: PayloadAction<IProductState>) {
      state.processLoading = false;
      state.processSuccess = action.payload.message;
      state.product = action.payload.product;
    },
    CreateProductProcessFail(state, action: PayloadAction<string>) {
      state.processLoading = false;
      state.processError = action.payload;
    },
    ClearProcessProductSuccess(state) {
      state.processSuccess = null;
    },
    ClearProcessProductError(state) {
      state.processError = null;
    },

    UpDownProcessRequest(state) {
      state.upDownLoading = true;
    },
    UpDownProcessSuccess(state, action: PayloadAction<IProductState>) {
      state.upDownLoading = false;
      state.upDownSuccess = action.payload.message;
      state.product = action.payload.product;
    },
    UpDownProcessFail(state, action: PayloadAction<string>) {
      state.upDownLoading = false;
      state.upDownError = action.payload;
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

  CreateProductProcessRequest,
  CreateProductProcessSucess,
  CreateProductProcessFail,

  ClearProcessProductError,
  ClearProcessProductSuccess,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
