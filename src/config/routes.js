import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';
import { App } from '../layouts';
import { Home } from '../pages';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Home} />
    </Route>
  </Router>
);
