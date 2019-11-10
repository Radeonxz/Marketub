import { GET_USERS, GET_USER, GET_USERS_LOADING } from '../actions/types';

const initialState = {
  usersList: [],
  user_projects: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        usersList: action.payload,
        loading: false
      };

    case GET_USER:
      return {
        ...state,
        user_projects: action.payload,
        loading: false
      };

    case GET_USERS_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
