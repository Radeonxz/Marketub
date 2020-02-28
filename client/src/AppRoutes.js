import React from "react";
import { Switch, Route } from "react-router-dom";

// import page container
import UsersListContainer from "./containers/UsersListContainer";
import MyProjectsContainer from "./containers/MyProjectsContainer";
import NotFoundContainer from "./containers/NotFoundContainer";

// import Labs from "./labs";

const AppRoutes = () => (
  <Switch>
    <Route exact path="/">
      <UsersListContainer />
    </Route>
    <Route path="/myprojects">
      <MyProjectsContainer />
    </Route>
    <Route path="/user/:username/projects">
      <MyProjectsContainer />
    </Route>
    <Route>
      <NotFoundContainer />
    </Route>
    {/* <Route exact path="/labs">
      <Labs />
    </Route> */}
  </Switch>
);

export default AppRoutes;
