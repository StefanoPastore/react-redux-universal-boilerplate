import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import root from './root';

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
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
