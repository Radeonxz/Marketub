import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject
} from '../../actions/projectActions';
import { getUser } from '../../actions/userActions';

// import view component
import MyProjectsView from '../../components/MyProjectsView';
import EditProjectView from '../../components/EditProjectView';

class MyProjectsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      isOwner: true
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

  editToggle = () => {
    this.setState(state => ({ isEdit: !state.isEdit }));
  };

  render() {
    const { user_projects, my_projects } = this.props;
    const { isEdit, isOwner } = this.state;

    return (
      (!_.isEmpty(user_projects) || my_projects.length > 0) && (
        <div>
          <MyProjectsView
            user_projects={isOwner ? my_projects : user_projects.projects_array}
            editToggle={this.editToggle}
            // addProject={this.props.addProject}
            // updateProject={this.props.updateProject}
            // deleteProject={this.props.deleteProject}
          />
          {isOwner && (
            <EditProjectView isEdit={isEdit} editToggle={this.editToggle} />
          )}
        </div>
      )
    );
  }
}

MyProjectsPage.propTypes = {
  my_projects: PropTypes.array,
  user_projects: PropTypes.array,
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withRouter(compose(withConnect)(MyProjectsPage));
