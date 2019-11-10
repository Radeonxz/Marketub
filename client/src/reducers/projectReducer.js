import {
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  PROJECTS_LOADING
} from "../actions/types";

const initialState = {
  user_projects: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        user_projects: action.payload,
        loading: false
      };

    case ADD_PROJECT:
      debugger;
      return {
        ...state,
        user_projects: [...state.user_projects, action.payload]
      };

    case UPDATE_PROJECT:
      return {
        ...state,
        user_projects: [action.payload, ...state.user_projects]
      };

    case DELETE_PROJECT:
      return {
        ...state,
        user_projects: state.user_projects.filter(
          project => project.project_id !== action.payload
        )
      };

    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
