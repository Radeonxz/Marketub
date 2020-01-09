import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AuthProvider extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return isAuthenticated ? <p>Authenticated!</p> : <p>Unauthenticated!</p>;
  }
}

AuthProvider.propTypes = {
  isAuthenticated: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
