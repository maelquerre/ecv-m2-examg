import { types } from './authentication.actions';

export default function reducer(state, action) {
  switch (action.type) {
    case types.AUTH_STARTED:
      return {
        ...state,
        pending: true
      };

    case types.AUTH_DONE:
      return {
        ...state,
        pending: false,
        error: null,
        isLoggedIn: true,
        user: action.payload,
      };

    case types.AUTH_LOGOUT: {
      return {
        ...state,
        pending: false,
        error: null,
        isLoggedIn: false,
        user: null
      };
    }

    case types.AUTH_FAILED:
      return {
        ...state,
        pending: false,
        isLoggedIn: false,
        error: action.payload
      };

    default:
      return state;
  }
}
