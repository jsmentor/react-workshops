import _ from 'lodash';

export function beforeLoggerMiddleware(store) {
  return function(next) {
    return function(action) {
      console.log('>> WORKSHOP BEFORE MIDDLEWARE >> Before calling the action: ', action);
      return next(action);
    }
  }
}

export function afterLoggerMiddleware(store) {
  return function(next) {
    return function(action) {
      let dispatchResult = next(action);
      console.log('>> WORKSHOP AFTER MIDDLEWARE >> After dispatching the action: ', action);
      console.log('>> WORKSHOP AFTER MIDDLEWARE >> dispatchResult: ', dispatchResult);
      return dispatchResult;
    }
  }
}