import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { buyer, organizationState } from "../interfaces/businessInterface";


const initialState:organizationState = {
    status: false,

    buyerLoading: false,
    buyerSuccess:null,
    buyerError:null,

    vendorLoading: false,
    vendorSuccess:null,
    vendorError:null,

    contactLoading: false,
    contactSuccess:null,
    contactError:null,

    organizationLoading:false,
    organization:[],
    organizationError:null,
}
export const businessSlice = createSlice({
    name:'organization',
    initialState,
    reducers:{
        CreateBuyerRequest(state){
            state.buyerLoading = true
        },
        CreateBuyerSuccess(state, action:PayloadAction<string>){
            state.buyerLoading = false
            state.buyerSuccess = action.payload
        },
        CreateBuyerFail(state, action: PayloadAction<string>){
            state.buyerLoading = false
            state.buyerError = action.payload
        },

        CreateVendorRequest(state){
            state.vendorLoading = true
        },
        CreateVendorSuccess(state, action:PayloadAction<string>){
            state.vendorLoading = false
            state.vendorSuccess = action.payload
        },
        CreateVendorFail(state, action: PayloadAction<string>){
            state.vendorLoading = false
            state.vendorError = action.payload
        },

        CreateContactRequest(state){
            state.contactLoading = true
        },
        CreateContactSuccess(state, action:PayloadAction<string>){
            state.contactLoading = false
            state.contactSuccess = action.payload
        },
        CreateContactFail(state, action: PayloadAction<string>){
            state.contactLoading = false
            state.contactError = action.payload
        },

        GetOrganizationRequest(state){
            state.organizationLoading = true
        },
        GetOrganizationSuccess(state, action:PayloadAction<buyer[]>){
            state.organizationLoading= false
            state.organization = action.payload
        },
        GetOrganizationError(state, action:PayloadAction<string>){
            state.organizationLoading = false
            state.organizationError = action.payload
        },

        ClearCreateBuyerSuccess(state){
            state.buyerSuccess = null
        },
        ClearCreateBuyerError(state){
            state.buyerError = null
        },

        ClearCreateVendorSuccess(state){
            state.vendorSuccess = null
        },
        ClearCreateVendorError(state){
            state.vendorError = null
        },

        ClearCreateContactSuccess(state){
            state.contactSuccess = null
        },
        ClearCreateContactError(state){
            state.contactError = null
        },
    }
})


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
    ClearCreateContactSuccess
} = businessSlice.actions

export const businessReducer = businessSlice.reducer