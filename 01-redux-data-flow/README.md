# A Step-By-Step Walkthrough Of Redux Data Flow

## Motivation:
More complicated single-page applications: our code must manage more state than ever before

More complex UI state: we need to manage active routes, selected tabs, spinners, pagination controls, and so on.

Managing this ever-changing state is hard.
At some point, you no longer understand what happens in your app as you have lost control over the when, why, and how of its state.

When a system is opaque and non-deterministic, it's hard to reproduce bugs or add new features.

As if this wasn't bad enough: As developers, we are expected to handle:
  - optimistic updates
  - server-side rendering
  - fetching data before performing route transitions
and so on.

## Mutation and Asynchronicity:
  
I call them Mentos and Coke. Both can be great in separation, but together they create a mess.

React attempts to solve this problem in the view layer by removing both asynchrony and direct DOM manipulation. However:
  managing the state of your data is left up to you.
  This is where Redux enters.
  
Redux attempts to make state mutations predictable by imposing certain restrictions on how and when updates can happen.

These restrictions are reflected in the **_three principles of Redux_**.

### 1. Single source of truth
The state of your whole application is stored in an object tree within a single store:

```javascript
console.log(store.getState());

/* Prints
{
  ...stateObject
}
*/
```

### 2. State is read-only
The only way to change the state is to emit an action, an object describing what happened.

```javascript

function loadData(){
  store.dispatch({
    type: 'LOAD_DATA_REQUEST'
  });
  return $.get(API_URL)
    .done(function(data){
      store.dispatch({
        type: 'LOAD_DATA_SUCCESS',
        data: data
      });
    })
    .fail(function(error){
      store.dispatch({
        type: 'LOAD_DATA_FAILURE',
        error: error
      });
    });
}

```

### 3. Changes are made with pure functions
To specify how the state tree is transformed by actions, you write pure reducers.

```javascript
var initialState = {
    loading: false,
    data: null,
    error: null
};

function apiReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_DATA_REQUEST':
      return {
          ...state,
          loading: true
      };
    case 'LOAD_DATA_SUCCESS':
      return {
          ...state,
          loading: false,
          data: action.data
      };
    case 'LOAD_DATA_FAILURE':
      return {
          ...state,
          loading: false,
          error: action.error
      };
    default:
      return state
  }
}
```