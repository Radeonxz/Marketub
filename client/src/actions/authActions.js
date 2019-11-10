import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESETPASS_SUCCESS,
  RESETPASS_FAIL,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'AUTH_ERROR')
      );
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({
  username,
  email,
  password,
  password_confirm,
  activation
}) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({
    username,
    email,
    password,
    password_confirm,
    activation
  });

  axios
    .post('/api/auth/register', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth/login', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Reset Password
export const resetPassword = ({ email }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email });
  axios
    .post('/api/auth/forgot_password', body, config)
    .then(res =>
      dispatch({
        type: RESETPASS_SUCCESS
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'RESETPASS_FAIL')
      );
      dispatch({
        type: RESETPASS_FAIL
      });
    });
};

// Activate Account
export const activateAccount = ({ email }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email });

  axios
    .post('/api/auth/get_activation', body, config)
    .then(res =>
      dispatch({
        type: ACTIVATE_SUCCESS
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ACTIVATE_FAIL')
      );
      dispatch({
        type: ACTIVATE_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
