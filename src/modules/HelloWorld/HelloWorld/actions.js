import { helloWorld } from './selectors';

export const HELOWORLD = 'HELOWORLD';

export const setHelloWorld = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => setTimeout(
      () => {
        dispatch({
          type: HELOWORLD,
        });

        if (!helloWorld(getState())) {
          return reject(new Error('Async action failed!'));
        }

        return resolve({});
      },
      200
    ));
