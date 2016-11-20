import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, match, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { StyleSheet } from 'aphrodite';
import './config/i18n';
import './styles/main';
import configureStore from './config/configureStore';

window.logger = (process.env.NODE_ENV === 'development' ? console : { log: () => {} });

injectTapEventPlugin();

const preloadedState = window.__PRELOADED_STATE__;
const cssToRehydrate = window.__CSS_REHYDRATE__;

const store = configureStore(browserHistory, preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

if (process.env.NODE_ENV === 'production') {
  history.listen(location => window.ga('send', 'pageview', location.pathname));
}

StyleSheet.rehydrate(cssToRehydrate);

let getRoutes = require('./config/routes').default;
const rootElement = document.getElementById('root');

const routes = getRoutes(store, history);

const renderApp = () => match({ history, routes }, (error, redirectLocation, renderProps) => render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <Router {...renderProps} />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
));

if (module.hot) {
  const style = document.getElementById('styles');
  const styleLink = style.href;

  // Enable Webpack hot module replacement
  module.hot.accept('./config/routes', () => {
    getRoutes = require('./config/routes').default;
    unmountComponentAtNode(rootElement);

    renderApp();

    // update style
    style.href = `${styleLink}?id=${new Date().getMilliseconds()}`;
  });
}

renderApp();
