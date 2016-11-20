import { createAsyncActions, createSyncActions } from 'redux-universal-render';
import { helloWorld } from './selectors';
import { actions } from '../Status';

export const HELOWORLD = 'HELOWORLD';

export const setHelloWorld = () => createSyncActions(HELOWORLD)({ type: HELOWORLD });

export const asyncSetHelloWorld = () =>
  createAsyncActions(HELOWORLD)((dispatch, getState) => setTimeout(
      () => {
        dispatch(setHelloWorld());

        if (!helloWorld(getState())) {
          dispatch(actions.setCrash());
        }
      },
      200
    ));
