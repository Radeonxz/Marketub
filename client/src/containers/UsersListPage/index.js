import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { getUsers, getUser } from '../../actions/userActions';

class UsersListPage extends Component {
  render() {
    return <div></div>;
  }
}

UsersListPage.propTypes = {
  usersList: PropTypes.array,
  getUsers: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  usersList: state.usersList
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => {
    dispatch(getUsers());
  },
  getUser: username => {
    dispatch(getUser(username));
  }
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(UsersListPage);
