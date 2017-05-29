import { push } from 'react-router-redux';
import _ from '../utils/lodash-zoraq';
import { getLoginPath, setCookie, readCookieFrom, deleteCookie } from '../utils';
import * as security from '../utils/apis/security';
import {
  CHECK_AUTHENTICATION_REQUEST, CHECK_AUTHENTICATION_SUCCESS, CHECK_AUTHENTICATION_FAILURE,
  AUTHENTICATE_USER_REQUEST, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE,
  GENERATE_PASSWORD_REQUEST, GENERATE_PASSWORD_SUCCESS, GENERATE_PASSWORD_FAILURE,
  REDIRECT_AFTER_AUTHENTICATION, CHANGE_USER_NAME, LOGOUT_USER, CLEAR_LOGIN_VALIDATION_MSG,
} from '../constants';

const authenticationCookieExpireHours = 8;

export function loadAuthentication(cookies) {
  const ssPId = readCookieFrom(cookies, 'ss-pid');
  const token = readCookieFrom(cookies, 'token');
  const userName = readCookieFrom(cookies, 'userName');
  const displayName = readCookieFrom(cookies, 'displayName');
  const phone = readCookieFrom(cookies, 'phone');
  const email = readCookieFrom(cookies, 'email');

  if (!token && !ssPId) {
    return {
      type: AUTHENTICATE_USER_FAILURE,
      payload: {
        status: 0,
        statusText: 'شما لاگین نکرده اید.',
      },
    };
  }
  return {
    type: AUTHENTICATE_USER_SUCCESS,
    payload: {
      ssPId, token, userName, displayName, phone, email,
    },
  };
}

export function authenticateSuccess(response) {
  const phone = _.get(response, 'Meta.phone', '');
  const email = _.get(response, 'Meta.email', '');
  if (process.env.BROWSER) {
    setCookie('token', response.SessionId, authenticationCookieExpireHours);
    setCookie('userName', response.UserName, authenticationCookieExpireHours);
    setCookie('displayName', response.DisplayName, authenticationCookieExpireHours);
    setCookie('phone', phone, authenticationCookieExpireHours);
    setCookie('email', email, authenticationCookieExpireHours);

    // hardcoded session attributes
    setCookie('ss-pid', response.SessionId, authenticationCookieExpireHours);
    setCookie('ss-opt', 'perm', authenticationCookieExpireHours);
  }
  return {
    type: AUTHENTICATE_USER_SUCCESS,
    payload: {
      token: response.SessionId,
      userName: response.UserName,
      displayName: response.DisplayName,
      phone,
      email,
    },
  };
}

export function authenticateUserFailure(error) {
  if (process.env.BROWSER) {
    deleteCookie('token');
    deleteCookie('userName');
    deleteCookie('displayName');
    deleteCookie('phone');
    deleteCookie('email');

    // hardcoded session attributes
    deleteCookie('ss-pid');
    deleteCookie('ss-opt');
  }
  const status = _.get(error, 'response.status', 603);
  const statusText = _.get(error, 'response.statusText');
  return {
    type: AUTHENTICATE_USER_FAILURE,
    payload: {
      status,
      ...(statusText ? {
        statusText,
      } : null),
    },
  };
}

export function redirectAfterAuthentication(redirectTo) {
  return {
    type: REDIRECT_AFTER_AUTHENTICATION,
    payload: {
      redirectTo,
    },
  };
}

export function authenticateRequest() {
  return {
    type: AUTHENTICATE_USER_REQUEST,
  };
}

export function checkAuthenticationRequest() {
  return {
    type: CHECK_AUTHENTICATION_REQUEST,
  };
}

export function checkAuthenticationSuccess() {
  return {
    type: CHECK_AUTHENTICATION_SUCCESS,
  };
}

export function checkAuthenticationFailure(error) {
  return {
    type: CHECK_AUTHENTICATION_FAILURE,
    payload: {
      error,
    },
  };
}

export function clearLoginValidationMsg() {
  return {
    type: CLEAR_LOGIN_VALIDATION_MSG,
  };
}

export function generatePasswordRequest() {
  return {
    type: GENERATE_PASSWORD_REQUEST,
  };
}

export function generatePasswordSuccess(response) {
  return {
    type: GENERATE_PASSWORD_SUCCESS,
    payload: {
      response,
    },
  };
}

export function changeUserName(userName) {
  setCookie('userName', userName);
  return {
    type: CHANGE_USER_NAME,
    payload: {
      userName,
    },
  };
}

export function generatePasswordFailure(error) {
  return {
    type: GENERATE_PASSWORD_FAILURE,
    payload: {
      error,
    },
  };
}

export function generateUserPassword(params) {
  return async function (dispatch, getState) {
    const { authentication: { redirectTo, isAuthenticated } } = getState();
    dispatch(generatePasswordRequest());
    try {
      if (isAuthenticated) {
        await security.logout();
      }
      const response = await security.generatePassword(params);
      if (response) {
        dispatch(generatePasswordSuccess(params, response));
        dispatch(changeUserName(params.phone || params.email));
        dispatch(push(getLoginPath(redirectTo)));
      } else {
        dispatch(generatePasswordFailure(Error('generatePassword failed!')));
      }
    } catch (error) {
      dispatch(generatePasswordFailure(error));
    }
  };
}

export function authenticateUser({ userName, password }) {
  return async function (dispatch, getState) {
    dispatch(authenticateRequest());
    try {
      const response = await security.authenticate({ userName, password, rememberMe: true });
      const { authentication: { redirectTo } } = getState();
      dispatch(changeUserName(userName));
      dispatch(authenticateSuccess(response));
      dispatch(push(redirectTo));
    } catch (error) {
      dispatch(authenticateUserFailure(error));
    }
  };
}

export function logoutAndRedirect() {
  return function (dispatch) {
    dispatch(logout());
    return security.logout()
      .then(() => {
        dispatch(push(getLoginPath()));
      })
      .catch((error) => {
        dispatch(push(getLoginPath()));
      });
  };
}

export function logoutUser() {
  return function (dispatch) {
    dispatch(logout());
    return security.logout()
      .then(() => {
        dispatch(push('/'));
      })
      .catch((error) => {
        dispatch(push('/'));
      });
  };
}

export function checkAuthentication() {
  return function (dispatch, getState, { isAuthenticated }) {
    const loginPath = getLoginPath();
    dispatch(checkAuthenticationRequest());
    return isAuthenticated()
      .then((isAuthenticated) => {
        dispatch(checkAuthenticationSuccess());
        if (!isAuthenticated) {
          dispatch(logout());
          dispatch(push(loginPath));
        } else {
          console.log('Yes you are indeed Authenticated');
        }
      })
      .catch((error) => {
        dispatch(checkAuthenticationFailure(error));
        dispatch(logout());
        dispatch(push(loginPath));
      });
  };
}

export function logout() {
  if (process.env.BROWSER) {
    deleteCookie('token');
    deleteCookie('userName');
    deleteCookie('displayName');
    deleteCookie('phone');
    deleteCookie('email');

    // hardcoded session attributes
    deleteCookie('ss-pid');
    deleteCookie('ss-opt');
  }
  return {
    type: LOGOUT_USER,
  };
}

// WEBPACK FOOTER //
// ./src/actions/authentication.js
