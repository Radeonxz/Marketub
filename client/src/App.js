import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import store from "./store";
import { loadUser } from "./actions/authActions";

import AppNavbar from "./components/AppNavbar/AppNavbar";
import UsersList from "./containers/UsersListPage";
// import MyProjects from "./containers/MyProjectsPage";
import MyProjects from "./containers/MyProjectsPageContainer";
import Labs from "./labs";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    const token = store.getState().auth.token;
    if (token) {
      store.dispatch(loadUser());
    }
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Provider store={store}>
            <div className="App">
              <AppNavbar />
              <Switch>
                <Route exact path="/">
                  <UsersList />
                </Route>
                <Route path="/myprojects">
                  <MyProjects />
                </Route>
                <Route path="/user/:username/projects">
                  <MyProjects {...this.props} />
                </Route>
                <Route exact path="/labs">
                  <Labs />
                </Route>
              </Switch>
            </div>
          </Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
