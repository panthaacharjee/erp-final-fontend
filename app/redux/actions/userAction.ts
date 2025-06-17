// import axios from "axios";
// // import AxiosPublic from "../axiosPublic"
// // const url = 'https://oriontrading-backend.onrender.com'
// // const url = `http://localhost:4000`
import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "@/app/components/Axios";
import { useQuery } from "@tanstack/react-query";

// import { AppThunk } from "../types";


export const loadUser = (session:string) => createAsyncThunk("user", async (dispatch: any) => {
    
    try{
      const {data, isLoading, error, isSuccess} = useQuery({
        queryKey:['user'],
        queryFn:async()=>{
            const res = await Axios.get("/user/profile", {
              headers:{
                Authorization:`Bearer ${session}`
              }
            })
            return res.status===200 ? res.data : []
        }
      })

      if(isLoading){
        dispatch({type:"LoadUserRequest"});
      }
      if(isSuccess){
        dispatch({type:"LoadUserSuccess", payload:data.user})
      }
      if(error){
        dispatch({type:"LoadUserFail", payload:error.message})
      }
      
    }catch(err:any){
      dispatch({type:"LoadUserFail", payload:err.response.data.message})
    }
})

// // const axiosPublic = AxiosPublic()
// export const registerUser = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "RegisterRequest" });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.post( `/api/v1/register/user`, userData, config);
//     dispatch({ type: "RegisterSuccess", payload: data.user });
//   } catch (err) {
//     dispatch({ type: "RegisterFail", payload: err.response.data.message });
//   }
// };

// export const loginUser = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "LoginRequest" });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.post( `/api/v1/login/user`, userData, config);
//     dispatch({ type: "LoginSuccess", payload: data.user });
//   } catch (err) {
//     dispatch({ type: "LoginFail", payload: err.response.data.message });
//   }
// };

// export const loadUser = () => async (dispatch) => {
//   try {
//     dispatch({ type: "LoadUserRequest" });

//     const { data } = await axios.get(`/api/v1/profile/me`);
//     dispatch({ type: "LoadUserSuccess", payload: data.user });
//   } catch (err) {
//     dispatch({ type: "LoadUserFail", payload: err.response.data.message });
//     // console.log(error.message);
//   }
// };

// export const forgotPassword = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "ForgotPasswordRequest" });
//     const config = { headers: { "Content-Type": "multipart/form-data" } };

//     const { data } = await axios.post(
//       `/api/v1/password/forgot`,
//       userData,
//       config
//     );
//     dispatch({ type: "ForgotPasswordSuccess", payload: data.message });
//   } catch (err) {
//     dispatch({
//       type: "ForgotPasswordFail",
//       payload: err.response.data.message,
//     });
//     // console.log(error.message);
//   }
// };

// //Reset Password
// export const resetPassword = (userData, token) => async (dispatch) => {
//   try {
//     dispatch({ type: "ResetPasswordRequest" });
//     const config = { headers: { "Content-Type": "multipart/form-data" } };

//     const { data } = await axios.put(
//       `/api/v1/password/reset/${token}`,
//       userData,
//       config
//     );
//     dispatch({ type: "ResetPasswordSuccess", payload: data.message });
//     // console.log(data);
//   } catch (error) {
//     dispatch({
//       type: "ResetPasswordFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Logout User
// export const logOut = () => async (dispatch) => {
//   try {
//     dispatch({ type: "LogoutRequest" });
//     // const config = { headers: { "Content-Type": "multipart/form-data" } };

//     await axios.get(`/api/v1/logout`);
//     dispatch({ type: "LogoutSuccess" });
//   } catch (error) {
//     dispatch({
//       type: "LogoutFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //User Verification
// export const userVerification = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "UserVerificationRequest" });
//     const config = { headers: { "Content-Type": "multipart/form-data" } };

//     const { data } = await axios.put(
//       `/api/v1/user/verification`,
//       userData,
//       config
//     );
//     dispatch({ type: "UserVerificationSuccess", payload: data.message });
//     // console.log(data);
//   } catch (error) {
//     dispatch({
//       type: "UserVerificationFail",
//       payload: error.response.data.message,
//     });
//   }
// };




// //Sent Password Token
// export const sentPasswordToken = () => async (dispatch) => {
//   try {
//     dispatch({ type: "SentPasswordTokenRequest" });

//     const { data } = await axios.get(
//       `/api/v1/sent/password/token`,
//     );
//     dispatch({ type: "SentPasswordTokenSuccess", payload: data.message });
//   } catch (err) {
//     dispatch({
//       type: "SentPasswordTokenFail",
//       payload: err.response.data.message,
//     });
//     // console.log(error.message);
//   }
// };

// //Sent Password Token
// export const updatePassword = (userData, token) => async (dispatch) => {
//   try {
//     dispatch({ type: "UpdatePasswordRequest" });
//     const config = { headers: { "Content-Type": "multipart/form-data"} };

//     const { data } = await axios.put(
//       `${url}/api/v1/update/password`,
//       userData,
//       config
//     );
//     dispatch({ type: "UpdatePasswordSuccess", payload: data.message });
//   } catch (err) {
//     dispatch({
//       type: "UpdatePasswordFail",
//       payload: err.response.data.message,
//     });
//     // console.log(error.message);
//   }
// };

// //Update Profile
// export const updateProfile = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "UpdateProfileRequest" });
//     const config = { headers: { "Content-Type": "multipart/form-data" } };

//     const { data } = await axios.put(
//       `/api/v1/profile/update`,
//       userData,
//       config
//     );
//     dispatch({ type: "UpdateProfileSuccess", payload: data.message });
//   } catch (err) {
//     dispatch({
//       type: "UpdateProfileFail",
//       payload: err.response.data.message,
//     });
//     // console.log(error.message);
//   }
// };

// //Update Avatar
// export const updateAvatar= (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "UpdateAvatarRequest" });
//     const config = { headers: { "Content-Type": "multipart/form-data"} };

//     const { data } = await axios.put(
//       `/api/v1/avatar/update`,
//       userData,
//       config
//     );
//     dispatch({ type: "UpdateAvatarSuccess", payload: data.message });
//   } catch (err) {
//     dispatch({
//       type: "UpdateAvatarFail",
//       payload: err.response.data.message,
//     });
//     // console.log(error.message);
//   }
// }

// //User Deposit
// export const userDeposit = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "UserDepositRequest" });
//     const config = { headers: { "Content-Type": "multipart/form-data" } };

//     const { data } = await axios.post(
//       `/api/v1/user/deposit`,
//       userData,
//       config
//     );
//     dispatch({ type: "UserDepositSuccess", payload: data });
//     // console.log(data);
//   } catch (error) {
//     dispatch({
//       type: "UserDepositFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //User ALL Deposit
// export const allDeposit = () => async (dispatch) => {
//   try {
//     dispatch({ type: "AllDepositRequest" });

//     const { data } = await axios.get(`/api/v1/user/all/deposit`);
//     dispatch({ type: "AllDepositSuccess", payload: data.allDeposit });
//     // console.log(data);
//   } catch (error) {
//     dispatch({
//       type: "AllDepositFail",
//       payload: error.response.data.message,
//     });
//   }
// };


// //User Withdraw
// export const userWithdraw = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "UserWithdrawRequest" });
//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.post(
//       `/api/v1/user/withdraw`,
//       userData,
//       config
//     );
//     dispatch({ type: "UserWithdrawSuccess", payload: data.message });
//     // console.log(data);
//   } catch (error) {
//     dispatch({
//       type: "UserWithdrawFail",
//       payload: error.response.data.message,
//     });
//   }
// };


// //OTS Transfer
// export const userOTSTransfer = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "OTSTransferRequest" });
//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(
//       `/api/v1/ots/transfer`,
//       userData,
//       config
//     );
//     dispatch({ type: "OTSTransferSuccess", payload: data.message });
//     // console.log(data);
//   } catch (error) {
//     dispatch({
//       type: "OTSTransferFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Spot History
// export const otsHistory = () => async (dispatch) => {
//   try {
//     dispatch({ type: "OtsHistoryRequest" });

//     const { data } = await axios.get(`/api/v1/ots/history`);
//     dispatch({ type: "OtsHistorySuccess", payload: data });
//   } catch (error) {
//     dispatch({
//       type: "OtsHistoryFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Transfer Funding To Spot
// export const fundingToSpot = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "FundingToSpotRequest" });
//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(
//       `/api/v1/funding/to/spot`,
//       userData,
//       config
//     );
//     dispatch({ type: "FundingToSpotSuccess", payload: data.message });
//     // console.log(data);
//   } catch (error) {
//     dispatch({
//       type: "FundingToSpotFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Funding History
// export const fundingHistory = () => async (dispatch) => {
//   try {
//     dispatch({ type: "FundingHistoryRequest" });

//     const { data } = await axios.get(`/api/v1/funding/history`);
//     dispatch({ type: "FundingHistorySuccess", payload: data });
//   } catch (error) {
//     dispatch({
//       type: "FundingHistoryFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Transfer Spot
// export const spotTransfer = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "SpotTransferRequest" });
//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(
//       `/api/v1/spot/transfer`,
//       userData,
//       config
//     );
//     dispatch({ type: "SpotTransferSuccess", payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: "SpotTransferFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Spot History
// export const spotHistory = () => async (dispatch) => {
//   try {
//     dispatch({ type: "SpotHistoryRequest" });

//     const { data } = await axios.get(`/api/v1/spot/history`);
//     dispatch({ type: "SpotHistorySuccess", payload: data });
//   } catch (error) {
//     dispatch({
//       type: "SpotHistoryFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Transfer AI To Spot
// export const aiToSpot = (userData, token) => async (dispatch) => {
//   try {
//     dispatch({ type: "AIToSpotRequest" });
//     const config = { headers: { "Content-Type": "application/json", Authorization:`Bearear ${token}` } };

//     const { data } = await axios.put(
//       `/api/v1/ai/to/spot`,
//       userData,
//       config
//     );
//     dispatch({ type: "AIToSpotSuccess", payload: data.message });
//     // console.log(data);
//   } catch (error) {
//     dispatch({
//       type: "AIToSpotFail",
//       payload: error.response.data.message,
//     });
//   }
// };


// //AI History
// export const aiHistory = () => async (dispatch) => {
//   try {
//     dispatch({ type: "AIHistoryRequest" });

//     const { data } = await axios.get(`/api/v1/ai/history`);
//     dispatch({ type: "AIHistorySuccess", payload: data });
//   } catch (error) {
//     dispatch({
//       type: "AIHistoryFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Team Bonus
// export const teamBonus = () => async (dispatch) => {
//   try {
//     dispatch({ type: "TeamBonusRequest" });

//     const { data } = await axios.get(`/api/v1/team/bonus/history`);
//     dispatch({ type: "TeamBonusSuccess", payload: data });
//   } catch (error) {
//     dispatch({
//       type: "TeamBonusFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Withdraw History
// export const withdrawHistory = () => async (dispatch) => {
//   try {
//     dispatch({ type: "WithdrawHistoryRequest" });

//     const { data } = await axios.get(`/api/v1/withdraw/history`);
//     dispatch({ type: "WithdrawHistorySuccess", payload: data });
//   } catch (error) {
//     dispatch({
//       type: "WithdrawHistoryFail",
//       payload: error.response.data.message,
//     });
//   }
// };


// //Trade Status
// export const tradeStatus = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "TradeStatusRequest" });
//     const config = { headers: { "Content-Type": "application/json"} };

//     const { data } = await axios.put(
//       `/api/v1/trade/status`,
//       userData,
//       config
//     );
//     dispatch({ type: "TradeStatusSuccess", payload: data.message });
//     // console.log(data);
//   } catch (error) {
//     dispatch({
//       type: "TradeStatusFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Dirrect Refferal
// export const directRefferal = () => async (dispatch) => {
//   try {
//     dispatch({ type: "DirrectRefferalRequest" });

//     const { data } = await axios.get(
//       `/api/v1/dirrect/refferal`,
//     );
//     dispatch({ type: "DirrectRefferalSuccess", payload: data });
//     // console.log(data);
//   } catch (error) {
//     dispatch({
//       type: "DirrectRefferalFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Team Member
// export const teamMember = () => async (dispatch) => {
//   try {
//     dispatch({ type: "TeamMemberRequest" });

//     const { data } = await axios.get(
//       `/api/v1/team/member`,
//     );
//     dispatch({ type: "TeamMemberSuccess", payload: data });
//   } catch (error) {
//     dispatch({
//       type: "TeamMemberFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Team Turn Over
// export const turnOver = () => async (dispatch) => {
//   try {
//     dispatch({ type: "TurnOverRequest" });

//     const { data } = await axios.get(
//       `/api/v1/team/turnover`,
//     );
//     dispatch({ type: "TurnOverSuccess", payload: data });
//   } catch (error) {
//     dispatch({
//       type: "TurnOverFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Exchange
// export const exchangeCoin = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: "ExchangeRequest" });
//     const config = { headers: { "Content-Type": "application/json"} };

//     const { data } = await axios.put(
//       `/api/v1/exchange`,
//       userData,
//       config
//     );
//     dispatch({ type: "ExchangeSuccess", payload: data.message });
//     // console.log(data);
//   } catch (error) {
//     dispatch({
//       type: "ExchangeFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //Clearing Errors
// export const clearError = () => async (dispatch) => {
//   dispatch({ type: "ClearErrors" });
// };

// //Clearing Success
// export const clearSuccess = () => async (dispatch) => {
//   dispatch({ type: "ClearSuccess" });
// };

// //Clearing Success
// export const clearSuccessW = () => async (dispatch) => {
//   dispatch({ type: "ClearSuccessW" });
// };

// //Clearing Funding To Spot Success
// export const clearSuccessFTS = () => async (dispatch) => {
//   dispatch({ type: "ClearSuccessFTS" });
// };

// //Clearing Transfer OTS
// export const clearSuccessOTS = () => async (dispatch) => {
//   dispatch({ type: "ClearSuccessO" });
// };


// //Clearing  Spot Success
// export const clearSuccessST = () => async (dispatch) => {
//   dispatch({ type: "ClearSuccessST" });
// };


// //Clearing AI To Spot Success
// export const clearSuccessATS = () => async (dispatch) => {
//   dispatch({ type: "ClearSuccessATS" });
// };