import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar/AppNavbar";
import UsersListPage from "./containers/UsersListPage";
import MyProjects from "./containers/MyProjectsPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

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
                  <UsersListPage />
                </Route>
                <Route path="/myprojects">
                  <MyProjects />
                </Route>
                <Route path="/user/:username/projects">
                  <MyProjects {...this.props} />
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
