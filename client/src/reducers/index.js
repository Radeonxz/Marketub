import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  projects: projectReducer,
  user: userReducer,
  error: errorReducer,
  auth: authReducer
});
