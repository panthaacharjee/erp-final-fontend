import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGetOrder, orderState } from "../interfaces/OrderInterface";

const orderInitialState: orderState = {
  orderLoading: false,
  orderSuccess: null,
  orderError: null,

  bookingLoading: false,
  bookingSuccess: null,
  bookingError: null,

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

    ClearOrderSuccess(state) {
      state.orderSuccess = null;
    },
    ClearOrderError(state) {
      state.orderError = null;
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

  ClearOrderSuccess,
  ClearOrderError,

  ClearOrderRefresh,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
