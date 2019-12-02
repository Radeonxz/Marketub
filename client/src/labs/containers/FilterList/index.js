import { connect } from "react-redux";
import { compose } from "redux";
import FilterList from "./FilterList";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(FilterList);
