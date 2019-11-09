import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject
} from '../../actions/projectActions';

// import view component
import MyProjectsView from '../../components/MyProjectsView';
import EditProjectView from '../../components/EditProjectView';

class MyProjectsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false
    };
  }

  componentDidMount() {
    this.props.getProjects();
  }

  editToggle = () => {
    this.setState(state => ({ isEdit: !state.isEdit }));
  };

  render() {
    const { user_projects } = this.props;
    const { isEdit } = this.state;

    console.log('isEdit is', isEdit);
    return (
      user_projects && (
        <div>
          <MyProjectsView
            user_projects={user_projects}
            editToggle={this.editToggle}
            // addProject={this.props.addProject}
            // updateProject={this.props.updateProject}
            // deleteProject={this.props.deleteProject}
          />
          <EditProjectView isEdit={isEdit} editToggle={this.editToggle} />
        </div>
      )
    );
  }
}

MyProjectsPage.propTypes = {
  user_projects: PropTypes.array,
  getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user_projects: state.projects.user_projects
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
  }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MyProjectsPage);
