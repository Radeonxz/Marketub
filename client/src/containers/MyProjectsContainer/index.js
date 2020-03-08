import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject
} from "../../actions/projectActions";
import { getUser } from "../../actions/userActions";

import MyProjectsContainer from "./MyProjectsContainer";

const mapStateToProps = state => ({
  user_loading: state.user.loading,
  projects_loading: state.projects.loading,
  my_projects: state.projects.user_projects,
  user_projects: state.user.user_projects
});

const mapDispatchToProps = dispatch => ({
  getProjects: () => {
    dispatch(getProjects());
  },
  addProject: project => {
    dispatch(addProject(project));
  },
  updateProject: project => {
    dispatch(updateProject(project));
  },
  deleteProject: project_id => {
    dispatch(deleteProject(project_id));
  },
  getUser: username => {
    dispatch(getUser(username));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyProjectsContainer)
);
