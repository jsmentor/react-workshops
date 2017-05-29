import { createReducer } from '../utils';
import _ from '../utils/lodash-zoraq';
import {
  CHECK_AUTHENTICATION_REQUEST, CHECK_AUTHENTICATION_SUCCESS, CHECK_AUTHENTICATION_FAILURE,
  AUTHENTICATE_USER_REQUEST, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE, LOGOUT_USER,
  GENERATE_PASSWORD_REQUEST, GENERATE_PASSWORD_SUCCESS, GENERATE_PASSWORD_FAILURE,
  REDIRECT_AFTER_AUTHENTICATION, CHANGE_USER_NAME, CLEAR_LOGIN_VALIDATION_MSG,
} from '../constants';

const initialState = {
  token: null,
  userName: '',
  displayName: '',
  phone: null,
  email: null,
  isCheckingAuthentication: false,
  authenticationChecked: false,
  checkAuthenticationError: null,
  isAuthenticated: false,
  isAuthenticating: false,
  status: 0,
  statusText: '',
  redirectTo: '/profile',
  passwordGeneration: {
    isLoading: false,
    success: false,
    response: null,
    error: null,
  },
};

export default createReducer(initialState, {
  [CHECK_AUTHENTICATION_REQUEST]: state => ({
    ...state,
    isCheckingAuthentication: true,
    authenticationChecked: false,
    checkAuthenticationError: null,
  }),
  [CHECK_AUTHENTICATION_SUCCESS]: state => ({
    ...state,
    isCheckingAuthentication: false,
    authenticationChecked: true,
    checkAuthenticationError: null,
  }),
  [CHECK_AUTHENTICATION_FAILURE]: (state, { error }) => ({
    ...state,
    isCheckingAuthentication: false,
    authenticationChecked: false,
    checkAuthenticationError: error,
  }),
  [AUTHENTICATE_USER_REQUEST]: state => ({
    ...state,
    isAuthenticating: true,
    status: 0,
    statusText: '',
  }),
  [CLEAR_LOGIN_VALIDATION_MSG]: state => ({
    ...state,
    statusText: '',
  }),
  [AUTHENTICATE_USER_SUCCESS]: (state, payload) => ({
    ...state,
    isAuthenticating: false,
    isAuthenticated: true,
    status: 200,
    statusText: 'شما با موفقیت وارد شدید.',
    ...payload,
  }),
  [AUTHENTICATE_USER_FAILURE]: (state, payload) => ({
    ...state,
    isAuthenticating: false,
    isAuthenticated: false,
    token: null,
    userName: null,
    phone: null,
    email: null,
    displayName: null,
    status: _.get(payload, 'status', 500),
    statusText: _.get(payload, 'statusText', 'کد وارد شده اشتباه است'),
  }),
  [LOGOUT_USER]: state => ({
    ...state,
    isAuthenticated: false,
    token: null,
    userName: null,
    displayName: null,
    status: 0,
    statusText: 'شما با موفقیت خارج شدید.',
  }),
  [GENERATE_PASSWORD_REQUEST]: state => ({
    ...state,
    passwordGeneration: {
      ...initialState.passwordGeneration,
      isLoading: true,
    },
  }),
  [GENERATE_PASSWORD_SUCCESS]: (state, payload) => ({
    ...state,
    passwordGeneration: {
      ...initialState.passwordGeneration,
      success: true,
      response: payload.response,
      userName: payload.phone || payload.email,
    },
  }),
  [GENERATE_PASSWORD_FAILURE]: (state, payload) => ({
    ...state,
    passwordGeneration: {
      ...initialState.passwordGeneration,
      error: payload.error,
    },
  }),
  [REDIRECT_AFTER_AUTHENTICATION]: (state, { redirectTo }) => ({
    ...state,
    redirectTo,
  }),
  [CHANGE_USER_NAME]: (state, { userName }) => ({
    ...state,
    userName,
  }),
});
