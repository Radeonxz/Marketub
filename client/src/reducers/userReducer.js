import { GET_USERS, GET_USER, GET_USERS_LOADING } from '../actions/types';

const initialState = {
  users: [],
  user: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };

    case GET_USERS_LOADING:
      return {
        ...state,
        loading: true
      }

    default:
      return state;
  }
}