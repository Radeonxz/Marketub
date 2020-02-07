import React from "react";
import PropTypes from "prop-types";

const AuthProviderContainer = ({ isAuthenticated }) => {
  return isAuthenticated ? <p>Authenticated!</p> : <p>Unauthenticated!</p>;
};

AuthProviderContainer.propTypes = {
  /**
   * isAuthenticated status
   */
  isAuthenticated: PropTypes.bool.isRequired
};

export default AuthProviderContainer;
