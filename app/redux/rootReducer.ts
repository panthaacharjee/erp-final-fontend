import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import tabReducer from './reducers/tabReducer';
import hrReducer from "./reducers/HrReducer"
// Import other reducers

const rootReducer = combineReducers({
  user: userReducer,
  tab : tabReducer,
  hr: hrReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;