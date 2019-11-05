import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
  getProjects
  // addProject,
  // updateProject,
  // deleteProject
} from '../../actions/projectActions';

// import view component
import MyProjectsView from '../../components/MyProjectsView';

class MyProjectsPage extends Component {
  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const { user_projects } = this.props;
    return (
      user_projects && (
        <div>
          <MyProjectsView user_projects={user_projects} />
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
  }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MyProjectsPage);
