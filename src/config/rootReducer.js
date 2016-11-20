import * as reducers from '../modules';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { reduxUniversalRenderReducer } from 'redux-universal-render';

// combine utils with real data reducers
export default combineReducers({
  ...reducers,
  routing,
  form,
  reduxUniversalRenderReducer,
});
