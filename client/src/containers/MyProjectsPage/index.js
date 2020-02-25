import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject
} from "../../actions/projectActions";
import { getUser } from "../../actions/userActions";

// import view component
import MyProjects from "../../components/MyProjects";
import EditProjectView from "../../components/EditProjectView";

class MyProjectsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      isOwner: true,
      editProject: {}
    };
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.match.params)) {
      const { username } = this.props.match.params;
      this.setState({ isOwner: false });
      this.props.getUser(username);
    } else {
      this.props.getProjects();
    }
  }

  editToggle = project => {
    this.setState(state => ({ editProject: project, isEdit: !state.isEdit }));
  };

  render() {
    const { user_projects, my_projects } = this.props;
    const { isEdit, isOwner, editProject } = this.state;

    return (
      (!_.isEmpty(user_projects) || isOwner) && (
        <div>
          <MyProjects
            user_projects={isOwner ? my_projects : user_projects.projects_array}
            isOwner={isOwner}
            editToggle={this.editToggle}
            deleteProject={this.props.deleteProject}
          />
          {isOwner && (
            <EditProjectView
              isEdit={isEdit}
              editProject={editProject}
              editToggle={this.editToggle}
              addProject={this.props.addProject}
              updateProject={this.props.updateProject}
            />
          )}
        </div>
      )
    );
  }
}

MyProjectsPage.defaultProps = {
  my_projects: [],
  user_projects: {}
};

MyProjectsPage.propTypes = {
  my_projects: PropTypes.array,
  user_projects: PropTypes.object,
  getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
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
  connect(mapStateToProps, mapDispatchToProps)(MyProjectsPage)
);
