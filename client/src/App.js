import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store";
import { loadUser } from "./actions/authActions";

import AppNavbar from "./components/AppNavbar/AppNavbar";
import AppRoutes from "./AppRoutes";

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
              <AppRoutes />
            </div>
          </Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
