import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';


class Routes extends Component {
  render() {
    return (
      <Switch>
        {this.state.token && (
          <Redirect from='/' to='/events' exact />
        )}
        {this.state.token && (
          <Redirect from='/auth' to='/events' exact />
        )}
        {!this.state.token && (
          <Route path='/auth' component={AuthPage} />
        )}
        <Route path='/events' component={EventsPage} />
        {this.state.token && (
          <Route path='/bookings' component={BookingsPage} />
        )}
        {!this.state.token && (
          <Redirect to='/auth' exact />
        )}
      </Switch>
    )
  }
}

export default Routes;