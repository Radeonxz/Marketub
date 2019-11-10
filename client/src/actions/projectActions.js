import axios from "axios";
import {
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  PROJECTS_LOADING
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getProjects = () => (dispatch, getState) => {
  dispatch(setProjectsLoading);
  axios
    .get("/api/projects", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addProject = project => (dispatch, getState) => {
  axios
    .post("/api/project", project, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_PROJECT,
        payload: res.data.project
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateProject = (project, project_id) => (dispatch, getState) => {
  axios
    .put(`/api/project/${project_id}`, project, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_PROJECT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteProject = project_id => (dispatch, getState) => {
  axios
    .delete(`/api/project/${project_id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_PROJECT,
        payload: project_id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING
  };
};
