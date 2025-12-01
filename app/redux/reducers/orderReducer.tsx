import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGetOrder, orderState } from "../interfaces/OrderInterface";

const orderInitialState: orderState = {
  orderLoading: false,
  orderSuccess: null,
  orderError: null,

  bookingLoading: false,
  bookingSuccess: null,
  bookingError: null,

  artworkLoading: false,
  artworkSuccess: null,
  artworkError: null,

  orderValidationLoading: false,
  orderValidationSuccess: null,
  orderValidationError: null,

  orderDeleteLoading: false,
  orderDeleteSuccess: null,
  orderDeleteError: null,

  order: null,
};

interface IOrderState {
  message: string;
  order: IGetOrder;
}

const orderSlice = createSlice({
  name: "order",
  initialState: orderInitialState,
  reducers: {
    OrderRequest(state) {
      state.orderLoading = true;
    },
    OrderSuccess(state, action: PayloadAction<IOrderState>) {
      state.orderLoading = false;
      state.order = action.payload.order;
      state.orderSuccess = action.payload.message;
    },
    OrderFail(state, action: PayloadAction<string>) {
      state.orderLoading = false;
      state.orderSuccess = null;
      state.orderError = action.payload;
    },

    BookingFileRequest(state) {
      state.bookingLoading = true;
    },
    BookingFileSuccess(state, action: PayloadAction<IOrderState>) {
      state.bookingLoading = false;
      state.bookingSuccess = action.payload.message;
      state.order = action.payload.order;
    },
    BookingFileError(state, action: PayloadAction<string>) {
      state.bookingLoading = false;
      state.bookingSuccess = null;
      state.bookingSuccess = action.payload;
    },

    ArtworkFileRequest(state) {
      state.artworkLoading = true;
    },
    ArtworkFileSuccess(state, action: PayloadAction<IOrderState>) {
      state.artworkLoading = false;
      state.artworkSuccess = action.payload.message;
      state.order = action.payload.order;
    },
    ArtworkFileError(state, action: PayloadAction<string>) {
      state.artworkLoading = false;
      state.artworkSuccess = null;
      state.artworkSuccess = action.payload;
    },

    OrderValidationRequest(state) {
      state.orderValidationLoading = true;
    },
    OrderValidationSuccess(state, action: PayloadAction<IOrderState>) {
      state.orderValidationLoading = false;
      state.orderValidationSuccess = action.payload.message;
      state.order = action.payload.order;
    },
    OrderValidationError(state, action: PayloadAction<string>) {
      state.orderValidationLoading = false;
      state.orderValidationSuccess = null;
      state.orderValidationSuccess = action.payload;
    },

    OrderDeleteRequest(state) {
      state.orderDeleteLoading = true;
    },
    OrderDeleteSuccess(state, action: PayloadAction<IOrderState>) {
      state.orderDeleteLoading = false;
      state.orderDeleteSuccess = action.payload.message;
      state.order = action.payload.order;
    },
    OrderDeleteError(state, action: PayloadAction<string>) {
      state.orderDeleteLoading = false;
      state.orderDeleteSuccess = null;
      state.orderDeleteSuccess = action.payload;
    },

    ClearOrderSuccess(state) {
      state.orderSuccess = null;
    },
    ClearOrderError(state) {
      state.orderError = null;
    },

    ClearOrderDeleteSuccess(state) {
      state.orderDeleteSuccess = null;
    },
    ClearOrderDeleteError(state) {
      state.orderDeleteError = null;
    },

    ClearOrderRefresh(state) {
      state.order = null;
    },
  },
});

export const {
  OrderRequest,
  OrderSuccess,
  OrderFail,

  BookingFileRequest,
  BookingFileSuccess,
  BookingFileError,

  ArtworkFileRequest,
  ArtworkFileSuccess,
  ArtworkFileError,

  OrderValidationRequest,
  OrderValidationSuccess,
  OrderValidationError,

  OrderDeleteRequest,
  OrderDeleteSuccess,
  OrderDeleteError,

  ClearOrderSuccess,
  ClearOrderError,

  ClearOrderDeleteSuccess,
  ClearOrderDeleteError,

  ClearOrderRefresh,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
