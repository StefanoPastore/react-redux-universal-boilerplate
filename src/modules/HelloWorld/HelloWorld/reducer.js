import {
  HELOWORLD,
} from './actions';

const HelloWorld = (state = {
  helloWorld: false,
}, action) => {
  switch (action.type) {
    case HELOWORLD:
      return {
        ...state,
        helloWorld: true,
      };
    default:
      return state;
  }
};

export default HelloWorld;
