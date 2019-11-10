import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { getUsers, getUser } from '../../actions/userActions';

import UsersListPageView from '../../components/UsersListPageView';

class UsersListPage extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  onFetchUserClick = username => {
    if (this.props.user.user_projects.length === 0) {
      this.props.getUser(username);
    }
    this.setState(state => ({ collapse: !state.collapse }));
  };

  onClickToCloseCollapse = () => {
    this.setState(state => ({ collapse: false }));
  };

  render() {
    const { usersList } = this.props;
    return (
      <div>{usersList && <UsersListPageView usersList={usersList} />}</div>
    );
  }
}

UsersListPage.propTypes = {
  usersList: PropTypes.array,
  getUsers: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  usersList: state.user.usersList
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
