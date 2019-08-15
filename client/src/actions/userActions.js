import axios from 'axios';
import {
  GET_USERS,
  GET_USER,
  GET_USERS_LOADING,
  // GET_USER_LOADING
} from './types';

import { returnErrors } from './errorActions';

export const getUsers = () => dispatch => {
  dispatch(setUsersLoading);
  axios.get('/api/users')
  .then(res =>
    dispatch({
      type: GET_USERS,
      payload: res.data.data
  }))
  .catch(err =>
    dispatch(returnErrors(err.response.data, err.response.status))
  );
};

export const getUser = id => dispatch => {
  dispatch(setUsersLoading);
  axios.get(`/api/user/${id}`)
  .then(res =>
    dispatch({
      type: GET_USER,
      payload: res.data.data
  }))
  .catch(err =>
    dispatch(returnErrors(err.response.data, err.response.status))
  );
};

export const setUsersLoading = () => {
  return {
    type: GET_USERS_LOADING
  };
};

// export const setUserLoading = () => {
//   return {
//     type: GET_USER_LOADING
//   };
// };