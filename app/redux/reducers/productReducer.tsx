import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IGetProduct,
  ISampleGetProduct,
  productState,
  sampleProductState,
} from "../interfaces/productInterface";

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

  productValidationLoading: false,
  productValidationSuccess: null,
  productValidationError: null,

  productImageLoading: false,
  productImageSuccess: null,
  productImageError: null,

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

    ClearUpDownSuccess(state) {
      state.upDownSuccess = null;
    },
    ClearUpDownFail(state) {
      state.upDownError = null;
    },

    ProductValidationRequest(state) {
      state.productValidationLoading = true;
    },
    ProductValidationSuccess(state, action: PayloadAction<IProductState>) {
      state.productValidationLoading = false;
      state.productValidationSuccess = action.payload.message;
      state.product = action.payload.product;
    },
    ProductValidationFail(state, action: PayloadAction<string>) {
      state.productValidationLoading = false;
      state.productValidationError = action.payload;
    },

    ProductImageRequest(state) {
      state.productImageLoading = true;
    },
    ProductImageSuccess(state, action: PayloadAction<IProductState>) {
      state.productImageLoading = false;
      state.product = action.payload.product;
      state.productImageSuccess = action.payload.message;
    },
    ProductImageFail(state, action: PayloadAction<string>) {
      state.productImageLoading = false;
      state.productImageError = action.payload;
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

  UpDownProcessRequest,
  UpDownProcessSuccess,
  UpDownProcessFail,
  ClearUpDownSuccess,
  ClearUpDownFail,

  ProductValidationRequest,
  ProductValidationSuccess,
  ProductValidationFail,

  ProductImageRequest,
  ProductImageSuccess,
  ProductImageFail,
} = productSlice.actions;

/* ======= Sample ======== */

const smapleInitialState: sampleProductState = {
  sampleProductLoading: false,
  sampleProductSuccess: null,
  sampleProductError: null,

  sampleProcessLoading: false,
  sampleProcessSuccess: null,
  sampleProcessError: null,

  sampleUpDownLoading: false,
  sampleUpDownSuccess: null,
  sampleUpDownError: null,

  sampleProduct: null,
};

interface ISampleProductState {
  message: string;
  product: ISampleGetProduct;
}

const sampleSlice = createSlice({
  name: "sample",
  initialState: smapleInitialState,
  reducers: {
    SampleProductRequest(state) {
      state.sampleProductLoading = true;
    },
    SampleProductSuccess(state, action: PayloadAction<ISampleProductState>) {
      state.sampleProductLoading = false;
      state.sampleProduct = action.payload.product;
      state.sampleProductSuccess = action.payload.message;
    },
    SampleProductFail(state, action: PayloadAction<string>) {
      state.sampleProductLoading = false;
      state.sampleProductSuccess = null;
      state.sampleProductError = action.payload;
    },
    ClearSampleProductSuccess(state) {
      state.sampleProductSuccess = null;
    },
    ClearSampleProductError(state) {
      state.sampleProductError = null;
    },
    ClearSampleProductRefresh(state) {
      state.sampleProduct = null;
    },

    CreateSampleProductProcessRequest(state) {
      state.sampleProcessLoading = true;
    },
    CreateSampleProductProcessSucess(
      state,
      action: PayloadAction<IProductState>
    ) {
      state.sampleProcessLoading = false;
      state.sampleProcessSuccess = action.payload.message;
      state.sampleProduct = action.payload.product;
    },
    CreateSampleProductProcessFail(state, action: PayloadAction<string>) {
      state.sampleProcessLoading = false;
      state.sampleProcessError = action.payload;
    },
    ClearProcessSampleProductSuccess(state) {
      state.sampleProcessSuccess = null;
    },
    ClearProcessSampleProductError(state) {
      state.sampleProcessError = null;
    },

    UpDownSampleProcessRequest(state) {
      state.sampleUpDownLoading = true;
    },
    UpDownSampleProcessSuccess(state, action: PayloadAction<IProductState>) {
      state.sampleUpDownLoading = false;
      state.sampleUpDownSuccess = action.payload.message;
      state.sampleProduct = action.payload.product;
    },
    UpDownSampleProcessFail(state, action: PayloadAction<string>) {
      state.sampleUpDownLoading = false;
      state.sampleUpDownError = action.payload;
    },

    ClearSampleUpDownSuccess(state) {
      state.sampleUpDownSuccess = null;
    },
    ClearSampleUpDownFail(state) {
      state.sampleUpDownError = null;
    },
  },
});

export const {
  SampleProductRequest,
  SampleProductSuccess,
  SampleProductFail,

  ClearSampleProductSuccess,
  ClearSampleProductError,

  ClearSampleProductRefresh,

  CreateSampleProductProcessRequest,
  CreateSampleProductProcessSucess,
  CreateSampleProductProcessFail,

  ClearProcessSampleProductError,
  ClearProcessSampleProductSuccess,

  UpDownSampleProcessRequest,
  UpDownSampleProcessSuccess,
  UpDownSampleProcessFail,
  ClearSampleUpDownSuccess,
  ClearSampleUpDownFail,
} = sampleSlice.actions;

export const sampleProductReducer = sampleSlice.reducer;

export const productReducer = productSlice.reducer;
