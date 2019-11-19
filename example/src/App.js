import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { App as Todos } from "./TodoApp";
import Store from "./store";

// Mock current user
const currentUser = {
  id: '123'
}

export default () => (
  <Store.Provider>
    <Router basename="/todos">
      <Switch>
        <Route
          path="/:userId/:view?"
          render={({ match }) => (
            <Todos userId={match.params.userId} view={match.params.view} />
          )}
        />
        <Redirect to={`/${currentUser.id}`} />
      </Switch>
    </Router>
  </Store.Provider>
);
