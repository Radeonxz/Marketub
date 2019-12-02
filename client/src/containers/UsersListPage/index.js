import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { getUsers, getUser } from "../../actions/userActions";
import { changeLang } from "../../actions/langActions";

import CircularProgress from "@material-ui/core/CircularProgress";
import UsersListPageView from "../../components/UsersListPageView";
// Language Select
// import LangSelectView from "../../components/LangSelectView";

class UsersListPage extends Component {
  // Language Select
  constructor() {
    super();
    this.state = {
      languages: []
    };
  }

  loadJson = async locale => {
    const languages = await require(`../../utils/languages/${locale}/languages.json`);
    this.setState({ languages: languages });
  };

  componentDidMount() {
    this.props.getUsers();
    // // Language Select
    // this.loadJson(this.props.locale);
  }

  // Language Select
  componentDidUpdate(prevProps) {
    if (this.props.locale !== prevProps.locale) {
      this.loadJson(this.props.locale);
    }
  }

  // Language Select
  onChangeLocale = () => {
    if (this.props.locale === "en") {
      this.props.changeLang("fr");
    } else {
      this.props.changeLang("en");
    }
  };

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

    // Language Select
    // const { languages } = this.state;
    // const data = {
    //   languages: languages,
    //   firstLang: this.props.locale,
    //   onChangeLocale: this.onChangeLocale
    // };

    return (
      <div>
        {/* <LangSelectView data={data} /> */}
        {!(usersList.length > 0) && (
          <CircularProgress
            size="3rem"
            style={{ position: "relative", left: "50%", color: "white" }}
          />
        )}
        {usersList.length > 0 && <UsersListPageView usersList={usersList} />}
      </div>
    );
  }
}

UsersListPage.propTypes = {
  usersList: PropTypes.array,
  locale: PropTypes.string,
  getUsers: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  changeLang: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  usersList: state.user.usersList,
  locale: state.lang.locale
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => {
    dispatch(getUsers());
  },
  getUser: username => {
    dispatch(getUser(username));
  },
  changeLang: locale => {
    dispatch(changeLang(locale));
  }
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UsersListPage);
