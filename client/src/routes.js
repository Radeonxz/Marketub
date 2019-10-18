import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';


class Routes extends Component {
  render() {
    return (
      <Switch>
        {this.state.token && (
          <Redirect from='/' to='/events' exact />
        )}
      </Switch>
    )
  }
}

export default Routes;