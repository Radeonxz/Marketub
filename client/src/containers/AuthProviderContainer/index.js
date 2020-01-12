import { connect } from "react-redux";
import AuthProviderContainer from "./AuthProviderContainer";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthProviderContainer);
