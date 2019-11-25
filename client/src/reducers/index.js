import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import userReducer from "./userReducer";
import langReducer from "./langReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  projects: projectReducer,
  lang: langReducer,
  user: userReducer,
  error: errorReducer,
  auth: authReducer
});
