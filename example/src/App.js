import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Store from './store';
import { Todos } from './Todos';

// Mock current user
const currentUser = {
  id: '123'
};

export default () => (
  <Store.Provider>
    <Router>
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
