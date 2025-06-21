// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  TabState } from '../interfaces/tabInterface';


export const initialDataState:TabState = {
  loading: false,
  items:[{
    id:"tab-Home",
    title:"Home Page",
    icon:"home",
    
  }],
  content:[
    {
      id:"tab-Home",
      element:"home"
    }
  ]
  
};

const initialData = ()=>{
  try{
    const localData = localStorage.getItem('tabData')
    if(localData){
      return JSON.parse(localData)
    }
  }catch(err){
    console.log("Something Went Wrong", err)
  }
  return initialDataState
}

const initialState = initialData()

export const tabSlice = createSlice({
  name:'tab',
  initialState,
  reducers:{
    
    AddTabDataRequest (state){
      state.loading = true
    },
    AddTabDataSuccess (state, action:PayloadAction<TabState>){
      state.loading = false;
      state.items = action.payload.items;
      state.content = action.payload.content;
    },
    AddTabDataError(state){
      state.loading = false
    },


    RemoveTabRequest(state){
      state.loading = true
    },
    RemoveTabSuccess(state, action:PayloadAction<TabState>){
      state.loading = false
      state.items = action.payload.items
      state.content = action.payload.content
    },
    RemoveTabError(state){
      state.loading = true
    },
    
  }
})

export const {
  AddTabDataRequest,
  AddTabDataSuccess,
  AddTabDataError,
  RemoveTabRequest,
  RemoveTabSuccess,
  RemoveTabError
} = tabSlice.actions

export default tabSlice.reducer

