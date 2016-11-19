import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { App } from '../layouts';
import { Home } from '../pages';
import {
  actions as statusActions,
} from '../modules/Status';

export default (store, history) => (
  <Router history={syncHistoryWithStore(history, store)}>
    <Route path="/" component={App} >
      <IndexRoute component={Home} />
      <Route path="*" onEnter={() => store.dispatch(statusActions.setNotFound())} />
    </Route>
  </Router>
);
