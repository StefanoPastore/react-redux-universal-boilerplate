import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { reduxUniversalRenderMiddleware } from 'redux-universal-render';
import rootReducer from './rootReducer';
import root from '../utils/root';

export default function configureStore(history, initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(reduxUniversalRenderMiddleware, thunk, routerMiddleware(history)),
      (root.devToolsExtension && process.env.NODE_ENV === 'development') ?
        root.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../modules', () => {
      const nextRootReducer = require('../modules').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
