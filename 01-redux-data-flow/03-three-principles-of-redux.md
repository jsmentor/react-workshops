# Three Principles of Redux

## 1. Single source of truth
The state of your whole application is stored in an object tree within a single store:

```javascript
console.log(store.getState());

/* Prints
{
  ...stateObject
}
*/
```

## 2. State is read-only
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

## 3. Changes are made with pure functions
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