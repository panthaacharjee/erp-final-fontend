import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
// Import other reducers

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;