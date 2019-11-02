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
    return (
      <div>
        <MyProjectsView /*projects={projects}*/ />
      </div>
    );
  }
}

MyProjectsPage.propTypes = {
  getProjects: PropTypes.func.isRequired
};

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
