import React, { Component, Fragment } from 'react';
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

class MyProjectsPage extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <MyProjectsView />
      </div>
    );
  }
}

MyProjectsPage.propTypes = {};

const mapStateToProps = state => ({});

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
