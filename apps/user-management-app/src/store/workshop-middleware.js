export function beforeLoggerMiddleware(store) {
  return function(next) {
    return function(action) {
      console.error('>> WORKSHOP BEFORE MIDDLEWARE >> Before calling the action: ', action);
      return next(action);
    }
  }
}

export function afterLoggerMiddleware(store) {
  return function(next) {
    return function(action) {
      try {
        let dispatchResult = next(action);
        console.error('>> WORKSHOP AFTER MIDDLEWARE >> After dispatching the action: ', action);
        console.error('>> WORKSHOP AFTER MIDDLEWARE >> dispatchResult: ', dispatchResult);
        return dispatchResult;
      } catch (err) {
        throw err;
      }
    }
  }
}