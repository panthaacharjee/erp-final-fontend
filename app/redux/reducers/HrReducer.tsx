// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HrUserState, User } from "../interfaces/userInterface";




const initialState:HrUserState = {
  status : false,
  loading: false,
  user:null,
  error:null,
  success:null,
  message:null
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
    }
  }
})

export const {UserCreateAndUpdateRequest, 
  UserCreateAndUpdateSuccess, 
  UserCreateAndUpdateFail, 
  ClearUserSuccess,
  ClearSuccess,
  ClearUserError
} = hrSlice.actions

export default hrSlice.reducer