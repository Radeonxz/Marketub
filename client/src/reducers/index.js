import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  item: itemReducer,
  user: userReducer,
  error: errorReducer,
  auth: authReducer
});