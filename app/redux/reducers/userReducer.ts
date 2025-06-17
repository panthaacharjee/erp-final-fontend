// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from "../interfaces/userInterface";




const initialState:UserState = {
  isAuthenticated: false,
  status : false,
  loading: false,
  user:null,
  error:null,
  success:null
};


export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    LoadUserRequest(state){
      state.loading = true
      state.isAuthenticated = false
    },
    LoadUserSuccess(state, action:PayloadAction<User>){
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
     LoadUserFail(state, action:PayloadAction<string>){
      state.loading = false
      state.isAuthenticated = false
      state.error = action.payload

    }
  }
})

export const {LoadUserRequest, LoadUserSuccess, LoadUserFail} = userSlice.actions

export default userSlice.reducer


// export const userReducer = createReducer(initialState, (builder)=>{

//   builder.addCase("RegisterRequest", (state)=>{
//     state.loading = true;
//     state.isAuthenticated = false;
//   })
//   builder.addCase("RegisterSuccess", (state, action)=>{
//     state.loading = false;
//     state.isAuthenticated = true;
//     state.user = action.payload;
//   })
//   builder.addCase("RegisterFail", (state, action)=>{
//     state.loading = false;
//     state.isAuthenticated = false;
//     state.error = action.payload;
//   })

//   builder.addCase("LoginRequest", (state)=>{
//     state.loading = true;
//     state.isAuthenticated = false;
//   })
//   builder.addCase("LoginSuccess", (state, action)=>{
//     state.loading = false;
//     state.isAuthenticated = true;
//     state.user = action.payload;
//   })
//   builder.addCase("LoginFail", (state, action)=>{
//     state.loading = false;
//     state.isAuthenticated = false;
//     state.error = action.payload;
//   })

//   builder.addCase("LoadUserRequest", (state)=>{
//     state.loading = true;
//     state.isAuthenticated = false;
//   })
//   builder.addCase("LoadUserSuccess", (state, action)=>{
//     state.loading = false;
//     state.isAuthenticated = true;
//     state.user = action.payload;
//   })
//   builder.addCase("LoadUserFail", (state, action)=>{
//     state.loading = false;
//     state.isAuthenticated = false;
//     state.error = action.payload;
//   })

//   builder.addCase("LogoutRequest", (state)=>{
//     state.loading = true;
//     state.isAuthenticated = true;
//   })
//   builder.addCase("LogoutSuccess", (state, action)=>{
//     state.loading = false;
//     state.isAuthenticated = false;
//     state.user = action.payload;
//   })
//   builder.addCase("LogoutFail", (state, action)=>{
//     state.loading = false;
//     state.isAuthenticated = true;
//     state.error = action.payload;
//   })
//   builder.addCase("ClearErrors", (state)=>{
//     state.error = null;
//   })
// })

// export const forgotPasswordReducer = createReducer(initialState, (builder)=>{

//   builder.addCase("ForgotPasswordRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("ForgotPasswordSuccess", (state, action)=>{
//     state.loading = false;
//     state.success = action.payload;
//   })
//   builder.addCase("ForgotPasswordFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("ResetPasswordRequest", (state)=>{
//     state.loading = true;
//   })
//   builder.addCase("ResetPasswordSuccess", (state, action)=>{
//     state.loading = false;
//     state.success = action.payload;
//   })
//   builder.addCase("ResetPasswordFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("ClearErrors", (state)=>{
//     state.error = null;
//   })
//   builder.addCase("ClearSuccess", (state)=>{
//     state.success = null;
//   })
// })

// export const verificationReducer = createReducer(initialState, (builder)=>{

//   builder.addCase("UserVerificationRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("UserVerificationSuccess", (state, action)=>{
//     state.loading = false;
//     state.success = action.payload;
//   })
//   builder.addCase("UserVerificationFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })


//   builder.addCase("UpdateAvatarRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("UpdateAvatarSuccess", (state, action)=>{
//     state.loading = false;
//     state.success = action.payload;
//   })
//   builder.addCase("UpdateAvatarFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("ClearErrors", (state)=>{
//     state.error = null;
//   })
//   builder.addCase("ClearSuccess", (state)=>{
//     state.success = null;
//   })

// })

// export const updateReducer = createReducer(initialState, (builder)=>{

//   builder.addCase("SentPasswordTokenRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("SentPasswordTokenSuccess", (state, action)=>{
//     state.loading = false;
//     state.success = action.payload;
//   })
//   builder.addCase("SentPasswordTokenFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("UpdatePasswordRequest", (state)=>{
//     state.uloading = true;
//     state.error = null;
//   })
//   builder.addCase("UpdatePasswordSuccess", (state, action)=>{
//     state.uloading = false;
//     state.success = action.payload;
//   })
//   builder.addCase("UpdatePasswordFail", (state, action)=>{
//     state.uloading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("UpdateProfileRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("UpdateProfileSuccess", (state, action)=>{
//     state.loading = false;
//     state.success = action.payload;
//   })
//   builder.addCase("UpdateProfileFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })


//   builder.addCase("ClearErrors", (state)=>{
//     state.error = null;
//   })
//   builder.addCase("ClearSuccess", (state)=>{
//     state.success = null;
//   })
// })

// const deposits = []
// export const userTransection = createReducer(initialState, (builder)=>{

//   builder.addCase("UserDepositRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("UserDepositSuccess", (state, action)=>{
//     state.loading = false;
//     state.success = action.payload.message;
//     state.deposits = action.payload.deposits
//   })
//   builder.addCase("UserDepositFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("AllDepositRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("AllDepositSuccess", (state, action)=>{
//     state.loading = false;
//     state.deposits = action.payload;
//   })
//   builder.addCase("AllDepositFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("UserWithdrawRequest", (state)=>{
//     state.wloading = true;
//     state.error = null;
//   })
//   builder.addCase("UserWithdrawSuccess", (state, action)=>{
//     state.wloading = false;
//     state.wsuccess = action.payload;
//   })
//   builder.addCase("UserWithdrawFail", (state, action)=>{
//     state.wloading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("FundingToSpotRequest", (state)=>{
//     state.ftsloading = true;
//     state.error = null;
//   })
//   builder.addCase("FundingToSpotSuccess", (state, action)=>{
//     state.ftsloading = false;
//     state.ftssuccess = action.payload;
//   })
//   builder.addCase("FundingToSpotFail", (state, action)=>{
//     state.ftsloading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("FundingHistoryRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("FundingHistorySuccess", (state, action)=>{
//     state.loading = false;
//     state.fundIn = action.payload.fundingIn;
//     state.fundOut = action.payload.fundingOut
//   })
//   builder.addCase("FundingHistoryFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })
  
//   builder.addCase("SpotTransferRequest", (state)=>{
//     state.stloading = true;
//     state.error = null;
//   })
//   builder.addCase("SpotTransferSuccess", (state, action)=>{
//     state.stloading = false;
//     state.stsuccess = action.payload;
//   })
//   builder.addCase("SpotTransferFail", (state, action)=>{
//     state.stloading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("SpotHistoryRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("SpotHistorySuccess", (state, action)=>{
//     state.loading = false;
//     state.spotIn = action.payload.spotIn;
//     state.spotOut = action.payload.spotOut
//   })
//   builder.addCase("SpotHistoryFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("AIToSpotRequest", (state)=>{
//     state.atsloading = true;
//     state.error = null;
//   })
//   builder.addCase("AIToSpotSuccess", (state, action)=>{
//     state.atsloading = false;
//     state.atssuccess = action.payload;
//   })
//   builder.addCase("AIToSpotFail", (state, action)=>{
//     state.atsloading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("AIHistoryRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("AIHistorySuccess", (state, action)=>{
//     state.loading = false;
//     state.aiIn = action.payload.aiIn;
//     state.aiOut = action.payload.aiOut
//   })
//   builder.addCase("AIHistoryFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("TeamBonusRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("TeamBonusSuccess", (state, action)=>{
//     state.loading = false;
//     state.bonus = action.payload.bonus;
//   })
//   builder.addCase("TeamBonusFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("OTSTransferRequest", (state)=>{
//     state.oloading = true;
//     state.error = null;
//   })
//   builder.addCase("OTSTransferSuccess", (state, action)=>{
//     state.oloading = false;
//     state.osuccess = action.payload;
//   })
//   builder.addCase("OTSTransferFail", (state, action)=>{
//     state.oloading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("OtsHistoryRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("OtsHistorySuccess", (state, action)=>{
//     state.loading = false;
//     state.sent = action.payload.sentHistory;
//     state.recive = action.payload.reciveHistory
//   })
//   builder.addCase("OtsHistoryFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("WithdrawHistoryRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("WithdrawHistorySuccess", (state, action)=>{
//     state.loading = false;
//     state.withdraw = action.payload.withdraw;
//   })
//   builder.addCase("WithdrawHistoryFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("ClearErrors", (state)=>{
//     state.error = null;
//   })
//   builder.addCase("ClearSuccess", (state)=>{
//     state.success = null;
//   })

//   builder.addCase("ClearErrorsO", (state)=>{
//     state.oerror = null;
//   })
//   builder.addCase("ClearSuccessO", (state)=>{
//     state.osuccess = null;
//   })
//   builder.addCase("ClearSuccessW", (state)=>{
//     state.wsuccess = null;
//   })
//   builder.addCase("ClearSuccessFTS", (state)=>{
//     state.ftssuccess = null;
//   })
//   builder.addCase("ClearSuccessST", (state)=>{
//     state.stsuccess = null;
//   })
//   builder.addCase("ClearSuccessATS", (state)=>{
//     state.atssuccess = null;
//   })
// })


// export const tradeReducer = createReducer(initialState, (builder)=>{

//   builder.addCase("TradeStatusRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//     state.status = false
//   })
//   builder.addCase("TradeStatusSuccess", (state, action)=>{
//     state.loading = false;
//     state.success = action.payload;
//     state.status = true;
//   })
//   builder.addCase("TradeStatusFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//     state.status = false
//   })

 

//   builder.addCase("ClearErrors", (state)=>{
//     state.error = null;
//   })
//   builder.addCase("ClearSuccess", (state)=>{
//     state.success = null;
//   })
// })

// export const affiliateReducer = createReducer(initialState, (builder)=>{

//   builder.addCase("DirrectRefferalRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("DirrectRefferalSuccess", (state, action)=>{
//     state.loading = false;
//     state.success = action.payload;
//     state.refferal =action.payload.refferal;
//     state.dirrectturnover = action.payload.turnover
//   })
//   builder.addCase("DirrectRefferalFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("TeamMemberRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("TeamMemberSuccess", (state, action)=>{
//     state.loading = false;
//     state.success = action.payload;
//     state.totalTeam =action.payload.totalTeam;
//   })
//   builder.addCase("TeamMemberFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

//   builder.addCase("TurnOverRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("TurnOverSuccess", (state, action)=>{
//     state.loading = false;
//     state.success = action.payload;
//     state.turnover =action.payload.turnover;
//   })
//   builder.addCase("TurnOverFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })

 

//   builder.addCase("ClearErrors", (state)=>{
//     state.error = null;
//   })
//   builder.addCase("ClearSuccess", (state)=>{
//     state.success = null;
//   })
// })


// export const exchangeReducer = createReducer(initialState, (builder)=>{

//   builder.addCase("ExchangeRequest", (state)=>{
//     state.loading = true;
//     state.error = null;
//   })
//   builder.addCase("ExchangeSuccess", (state, action)=>{
//     state.loading = false;
//     state.success = action.payload;
//   })
//   builder.addCase("ExchangeFail", (state, action)=>{
//     state.loading = false;
//     state.error = action.payload;
//   })
 

//   builder.addCase("ClearErrors", (state)=>{
//     state.error = null;
//   })
//   builder.addCase("ClearSuccess", (state)=>{
//     state.success = null;
//   })
// })