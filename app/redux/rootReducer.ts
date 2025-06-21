import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import tabReducer from './reducers/tabReducer';
// Import other reducers

const rootReducer = combineReducers({
  user: userReducer,
  tab : tabReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;