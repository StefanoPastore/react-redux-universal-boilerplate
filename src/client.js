import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { Resolver } from 'react-resolver';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { StyleSheet } from 'aphrodite';
import './config/i18n';
import './styles/main';
import configureStore from './utils/configureStore';
import root from './utils/root';

injectTapEventPlugin();

const preloadedState = root.__PRELOADED_STATE__;
const cssToRehydrate = root.__CSS_REHYDRATE__;

const store = configureStore(preloadedState);
StyleSheet.rehydrate(cssToRehydrate);

let getRoutes = require('./config/routes').default;
const rootElement = document.getElementById('root');

const renderApp = () => Resolver.render(
  () => <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      {getRoutes(store)}
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);

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
