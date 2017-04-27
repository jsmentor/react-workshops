# Redux Middlewares

Redux middleware solves different problems than __Express__ or __Koa__ middleware, but in a conceptually similar way.
It provides a __third-party extension point__ between __dispatching an action__, and __the moment it reaches the reducer__.
People use __Redux middleware__ for __logging__, __crash reporting__, __talking to an asynchronous API__, __routing__,
and more.

## Note:
It is highly recommended you take a look into [Redux Middleware](http://redux.js.org/docs/advanced/Middleware.html).
Specially the first part which is an in-depth intro to help you understand the concept: [Understanding Middleware](http://redux.js.org/docs/advanced/Middleware.html#understanding-middleware)

## Redux applyMiddleware
This is the logic behind Redux applyMiddleware function:
```javascript
function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()

  let dispatch = store.dispatch
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  )

  return Object.assign({}, store, { dispatch })
}
```

__Warning__: This is just a Naïve implementation! That's __not__ Redux API.

```javascript
function logger(store) {
  return function(next) {
    return function(action) {
      console.log('dispatching', action);
      let result = next(action);
      console.log('next state', store.getState());
      return result;
    }
  }
}

function crashReporter(store) {
  return function(next) {
    return function(action) {
      try {
        return next(action)
      } catch (err) {
        console.error('Caught an exception!', err)
        Raven.captureException(err, {
          extra: {
            action,
            state: store.getState()
          }
        });
        throw err
      }
    }
  }
}
```

Here's how to apply it to a Redux store:

```javascript
import { createStore, combineReducers, applyMiddleware } from 'redux';

let myApp = combineReducers(reducers);
let store = createStore(
  myApp,
  // applyMiddleware() tells createStore() how to handle middleware
  applyMiddleware(logger, crashReporter)
);
```