// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HrUserState, User } from "../interfaces/userInterface";
import { SalaryState } from '../interfaces/salaryInterface';




const initialState:HrUserState = {
  status : false,
  loading: false,
  user:null,
  error:null,
  success:null,
  message:null,
  users: [],
  filterUsers:[]
};


export const hrSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    UserCreateAndUpdateRequest(state){
      state.loading = true
    },
    UserCreateAndUpdateSuccess(state, action:PayloadAction<HrUserState>){
      state.loading = false
      state.user = action.payload.user
      state.success = true
      state.message = action.payload.message
    },
     UserCreateAndUpdateFail(state, action:PayloadAction<string>){
      state.loading = false
      state.error = action.payload
      state.success = null
    },
    ClearUserSuccess(state){
        state.user = null
        state.message = null
        state.success = null
    },
    ClearSuccess(state){
      state.message = null
    },
    ClearUserError(state){
        state.error = null
    },

   
    AllUserRequest(state){
      state.loading = true
    },
    AllUserSuccess(state, action:PayloadAction<HrUserState>){
      state.loading = false
      state.users= action.payload.users
      state.filterUsers = action.payload.filterUsers
    },
    AllUserFail(state, action:PayloadAction<string>){
      state.loading = false
      state.error = action.payload
    }

  
  }
})

const salaryInitialState:SalaryState ={
  status:false,

  salaryLoading:false,
  salaryError: null,
  salaryMessage:null,

  singleSalaryLoading:false,
  singleSalaryMessage:null,
  singleSalaryError:null,

  salaryPdfLoading:false,
  salaryPdfMessage:null,
  salaryPdfError:null
}
export const hrSalarySlice = createSlice({
  name:'salary',
  initialState: salaryInitialState,
  reducers:{
    ExcelSalaryRequest(state){
      state.salaryLoading = true
    },
    ExcelSalarySuccess(state, action:PayloadAction<string>){
      state.salaryLoading = false
      state.salaryMessage = action.payload
    },
    ExcelSalaryFail(state, action:PayloadAction<string>){
      state.salaryLoading = false
      state.salaryError = action.payload
    },
    ClearExcelSalarySuccess(state){
      state.salaryMessage = null
    },
    ClearExcelSalaryError(state){
      state.salaryError = null
    },

    SingleSalaryRequest(state){
      state.singleSalaryLoading = true
    },
    SingleSalarySuccess(state, action:PayloadAction<string>){
      state.singleSalaryLoading = false
      state.singleSalaryMessage = action.payload
    },
    SingleSalaryFail(state, action:PayloadAction<string>){
      state.singleSalaryLoading = false
      state.singleSalaryError = action.payload
    },
    ClearSingleSalarySuccess(state){
      state.singleSalaryMessage = null
    },
    ClearSingleSalaryError(state){
      state.singleSalaryError = null
    },

    SalaryPdfRequest(state){
      state.salaryPdfLoading = true
    },
    SalaryPdfSuccess(state){
      state.salaryPdfLoading = true
    },
    SalaryPdfFail(state){
      state.salaryPdfLoading = true
    },
  }
})


export const {
  UserCreateAndUpdateRequest, 
  UserCreateAndUpdateSuccess, 
  UserCreateAndUpdateFail, 
  ClearUserSuccess,
  ClearSuccess,
  ClearUserError,
  AllUserRequest,
  AllUserSuccess,
  AllUserFail
} = hrSlice.actions

export const {
  ExcelSalaryRequest,
  ExcelSalarySuccess, 
  ExcelSalaryFail,
  SingleSalaryRequest,
  SingleSalarySuccess,
  SingleSalaryFail,
  SalaryPdfRequest,
  SalaryPdfSuccess,
  SalaryPdfFail,

  ClearExcelSalaryError,
  ClearExcelSalarySuccess,
  ClearSingleSalarySuccess,
  ClearSingleSalaryError
} = hrSalarySlice.actions

export const hrUserReducer  =  hrSlice.reducer
export const hrSalaryReducer = hrSalarySlice.reducer