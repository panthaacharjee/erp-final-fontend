import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import tabReducer from './reducers/tabReducer';
import {hrSalaryReducer, hrUserReducer} from "./reducers/HrReducer"
// Import other reducers

const rootReducer = combineReducers({
  user: userReducer,
  tab : tabReducer,
  hr: hrUserReducer,
  salary: hrSalaryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;