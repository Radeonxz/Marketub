import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AuthProvider extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      isAuthenticated ? <p>Authenticated!</p> : <p>Unauthenticated!</p>
    )
  }
}

AuthProvider.PropTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(MyProjects);