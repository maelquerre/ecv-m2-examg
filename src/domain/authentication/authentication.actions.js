import { register, login, logout, getMe } from './authentication.service';

export const types = {
  AUTH_STARTED: 'AUTH_STARTED',
  AUTH_DONE: 'AUTH_DONE',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_FAILED: 'AUTH_FAILED'
};

export function authRegister(dispatch, data) {
  dispatch(_started());
  register(data)
    .then(({ user }) => dispatch(_onSuccess(user)))
    .catch(error => dispatch(_onError(error)));
}

export function authLogin(dispatch, data) {
  dispatch(_started());
  login(data)
    .then(({ user }) => dispatch(_onSuccess(user)))
    .catch(error => dispatch(_onError(error)));
}

export function authLogout(dispatch) {
  logout();
  dispatch({
    type: types.AUTH_LOGOUT
  });
}

export function authGetMe(dispatch) {
  dispatch(_started());
  getMe()
    .then((user) => dispatch(_onSuccess(user)))
    .catch(error => dispatch(_onError(error)));
}

function _started() {
  return {
    type: types.AUTH_STARTED
  };
}

function _onSuccess(user) {
  return {
    type: types.AUTH_DONE,
    payload: user
  };
}

function _onError(error) {
  return {
    type: types.AUTH_FAILED,
    payload: error
  };
}
