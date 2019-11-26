import { CHANGE_LANG } from "./types";

export const changeLang = locale => dispatch => {
  dispatch({
    type: CHANGE_LANG,
    payload: locale
  });
};
