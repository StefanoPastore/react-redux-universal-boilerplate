import {
  SET_CRASH,
  SET_NOT_FOUND,
} from './actions';

const Error = (state = {
  crash: false,
  notFound: false,
}, action) => {
  switch (action.type) {
    case SET_CRASH:
      return {
        ...state,
        crash: true,
      };
    case SET_NOT_FOUND:
      return {
        ...state,
        notFound: true,
      };
    default:
      return state;
  }
};

export default Error;
