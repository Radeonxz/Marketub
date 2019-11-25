import { CHANGE_LANG } from "../actions/types";

const initialState = {
  locale: "en"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANG:
      return {
        ...state,
        locale: action.payload
      };

    default:
      return state;
  }
}
