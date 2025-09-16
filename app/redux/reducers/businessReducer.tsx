import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  buyer,
  line as Line,
  organizationState,
  productDetailState,
  productProcessState,
} from "../interfaces/businessInterface";

const initialState: organizationState = {
  status: false,

  buyerLoading: false,
  buyerSuccess: null,
  buyerError: null,

  vendorLoading: false,
  vendorSuccess: null,
  vendorError: null,

  contactLoading: false,
  contactSuccess: null,
  contactError: null,

  organizationLoading: false,
  organization: [],
  organizationError: null,
};

const detailsState: productDetailState = {
  lineLoading: false,
  lineSuccess: null,
  lineError: null,

  categoryLoading: false,
  categorySuccess: null,
  categoryError: null,

  programLoading: false,
  programSuccess: null,
  programError: null,

  getLineLoading: false,
  getLine: [],
  getLineError: null,
};

const processState: productProcessState = {
  processLoading: false,
  processSuccess: null,
  processError: null,

  specLoading: false,
  specSuccess: null,
  specError: null,

  serialLoading: false,
  serialSuccess: null,
  serialError: null,

  itemLoading: false,
  itemSuccess: null,
  itemError: null,
};

export const businessSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    CreateBuyerRequest(state) {
      state.buyerLoading = true;
    },
    CreateBuyerSuccess(state, action: PayloadAction<string>) {
      state.buyerLoading = false;
      state.buyerSuccess = action.payload;
    },
    CreateBuyerFail(state, action: PayloadAction<string>) {
      state.buyerLoading = false;
      state.buyerError = action.payload;
    },

    CreateVendorRequest(state) {
      state.vendorLoading = true;
    },
    CreateVendorSuccess(state, action: PayloadAction<string>) {
      state.vendorLoading = false;
      state.vendorSuccess = action.payload;
    },
    CreateVendorFail(state, action: PayloadAction<string>) {
      state.vendorLoading = false;
      state.vendorError = action.payload;
    },

    CreateContactRequest(state) {
      state.contactLoading = true;
    },
    CreateContactSuccess(state, action: PayloadAction<string>) {
      state.contactLoading = false;
      state.contactSuccess = action.payload;
    },
    CreateContactFail(state, action: PayloadAction<string>) {
      state.contactLoading = false;
      state.contactError = action.payload;
    },

    GetOrganizationRequest(state) {
      state.organizationLoading = true;
    },
    GetOrganizationSuccess(state, action: PayloadAction<buyer[]>) {
      state.organizationLoading = false;
      state.organization = action.payload;
    },
    GetOrganizationError(state, action: PayloadAction<string>) {
      state.organizationLoading = false;
      state.organizationError = action.payload;
    },

    ClearCreateBuyerSuccess(state) {
      state.buyerSuccess = null;
    },
    ClearCreateBuyerError(state) {
      state.buyerError = null;
    },

    ClearCreateVendorSuccess(state) {
      state.vendorSuccess = null;
    },
    ClearCreateVendorError(state) {
      state.vendorError = null;
    },

    ClearCreateContactSuccess(state) {
      state.contactSuccess = null;
    },
    ClearCreateContactError(state) {
      state.contactError = null;
    },
  },
});

export const detailsSlice = createSlice({
  name: "details",
  initialState: detailsState,
  reducers: {
    CreateProductLineRequest(state) {
      state.lineLoading = true;
    },
    CreateProductLineSuccess(state, action: PayloadAction<string>) {
      state.lineLoading = false;
      state.lineSuccess = action.payload;
    },
    CreateProductLineFail(state, action: PayloadAction<string>) {
      state.lineLoading = false;
      state.lineError = action.payload;
    },

    CreateProductCategoryRequest(state) {
      state.categoryLoading = true;
    },
    CreateProductCategorySuccess(state, action: PayloadAction<string>) {
      state.categoryLoading = false;
      state.categorySuccess = action.payload;
    },
    CreateProductCategoryFail(state, action: PayloadAction<string>) {
      state.categoryLoading = false;
      state.categoryError = action.payload;
    },

    CreateProgramRequest(state) {
      state.programLoading = true;
    },
    CreateProgramSuccess(state, action: PayloadAction<string>) {
      state.programLoading = false;
      state.programSuccess = action.payload;
    },
    CreateProgramFail(state, action: PayloadAction<string>) {
      state.programLoading = false;
      state.programError = action.payload;
    },

    GetProductLineRequest(state) {
      state.getLineLoading = true;
    },

    GetProductLineSuccess(state, action: PayloadAction<Line[]>) {
      state.getLineLoading = false;
      state.getLine = action.payload;
    },
    GetProductLineFail(state, action: PayloadAction<string>) {
      state.getLineLoading = false;
      state.getLineError = action.payload;
    },

    ClearCreateProductLineSuccess(state) {
      state.lineSuccess = null;
    },
    ClearCreateProductLineError(state) {
      state.lineError = null;
    },

    ClearCreateProductCategorySuccess(state) {
      state.categorySuccess = null;
    },
    ClearCreateProductCategoryError(state) {
      state.categoryError = null;
    },
    ClearCreateProgramSuccess(state) {
      state.programSuccess = null;
    },
    ClearCreateProgramFail(state) {
      state.programError = null;
    },
  },
});

export const processSlice = createSlice({
  name: "process",
  initialState: processState,
  reducers: {
    CreateProcessRequest(state) {
      state.processLoading = true;
    },
    CreateProcessSuccess(state, action: PayloadAction<string>) {
      state.processLoading = false;
      state.processSuccess = action.payload;
    },
    CreateProcessFail(state, action: PayloadAction<string>) {
      state.processLoading = false;
      state.processError = action.payload;
    },

    CreateSpecRequest(state) {
      state.specLoading = true;
    },
    CreateSpecSuccess(state, action: PayloadAction<string>) {
      state.specLoading = false;
      state.specSuccess = action.payload;
    },
    CreateSpecFail(state, action: PayloadAction<string>) {
      state.specLoading = false;
      state.specError = action.payload;
    },

    CreateSerialRequest(state) {
      state.serialLoading = true;
    },
    CreateSerialSuccess(state, action: PayloadAction<string>) {
      state.serialLoading = false;
      state.serialSuccess = action.payload;
    },
    CreateSerialFail(state, action: PayloadAction<string>) {
      state.serialLoading = false;
      state.serialError = action.payload;
    },

    CreateItemRequest(state) {
      state.itemLoading = true;
    },
    CreateItemSuccess(state, action: PayloadAction<string>) {
      state.itemLoading = false;
      state.itemSuccess = action.payload;
    },
    CreateItemFail(state, action: PayloadAction<string>) {
      state.itemLoading = false;
      state.itemError = action.payload;
    },

    /* ========== Clear Error ============ */
    ClearProcessSuccess(state) {
      state.processSuccess = null;
    },
    ClearProcessError(state) {
      state.processError = null;
    },

    ClearSpecSuccess(state) {
      state.specSuccess = null;
    },
    ClearSpecError(state) {
      state.specError = null;
    },

    ClearSerialSuccess(state) {
      state.serialSuccess = null;
    },
    ClearSerialError(state) {
      state.serialError = null;
    },

    ClearItemSuccess(state) {
      state.itemSuccess = null;
    },
    ClearItemError(state) {
      state.itemError = null;
    },
  },
});

export const {
  CreateBuyerRequest,
  CreateBuyerSuccess,
  CreateBuyerFail,

  CreateVendorRequest,
  CreateVendorSuccess,
  CreateVendorFail,

  CreateContactRequest,
  CreateContactSuccess,
  CreateContactFail,

  GetOrganizationRequest,
  GetOrganizationSuccess,
  GetOrganizationError,

  ClearCreateBuyerError,
  ClearCreateBuyerSuccess,

  ClearCreateVendorError,
  ClearCreateVendorSuccess,

  ClearCreateContactError,
  ClearCreateContactSuccess,
} = businessSlice.actions;

export const {
  CreateProductLineRequest,
  CreateProductLineSuccess,
  CreateProductLineFail,

  CreateProductCategoryRequest,
  CreateProductCategorySuccess,
  CreateProductCategoryFail,

  CreateProgramRequest,
  CreateProgramSuccess,
  CreateProgramFail,

  GetProductLineRequest,
  GetProductLineSuccess,
  GetProductLineFail,

  ClearCreateProductLineSuccess,
  ClearCreateProductLineError,
  ClearCreateProductCategorySuccess,
  ClearCreateProductCategoryError,
  ClearCreateProgramSuccess,
  ClearCreateProgramFail,
} = detailsSlice.actions;

export const {
  CreateProcessRequest,
  CreateProcessSuccess,
  CreateProcessFail,

  CreateSpecRequest,
  CreateSpecSuccess,
  CreateSpecFail,

  CreateSerialRequest,
  CreateSerialSuccess,
  CreateSerialFail,

  CreateItemRequest,
  CreateItemSuccess,
  CreateItemFail,

  ClearProcessSuccess,
  ClearProcessError,
  ClearSpecSuccess,
  ClearSpecError,
  ClearSerialSuccess,
  ClearSerialError,
  ClearItemSuccess,
  ClearItemError,
} = processSlice.actions;

export const businessReducer = businessSlice.reducer;
export const productDetailReducer = detailsSlice.reducer;
export const processReducer = processSlice.reducer;
