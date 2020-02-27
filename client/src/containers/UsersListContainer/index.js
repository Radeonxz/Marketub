import { connect } from "react-redux";
import { getUsers, getUser } from "../../actions/userActions";

import UsersListContainer from "./UsersListContainer";

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

export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer);
