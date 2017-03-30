# Redux Data Lifecycle

The data lifecycle in any Redux app follows these 4 steps:

## 1.You call store.dispatch(action):

An action is a plain object describing what happened. For example:

```javascript
 { type: 'LIKE_ARTICLE', articleId: 42 }
 { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
 { type: 'ADD_TODO', text: 'Read the Redux docs.' }
```

## 2.The Redux store calls the reducer function you gave it

The store will pass __two__ arguments to the reducer:
    1. the current state tree
    2. the action.
For example, in the todo app, the root reducer might receive something like this:

```javascript
// The current application state (list of todos and chosen filter)
let previousState = {
  visibleTodoFilter: 'SHOW_ALL',
  todos: [ 
   {
     text: 'Read the docs.',
     complete: false
    }
]
}

// The action being performed (adding a todo)
let action = {
  type: 'ADD_TODO',
  text: 'Understand the flow.'
}

// Your reducer returns the next application state
let nextState = todoApp(previousState, action);
```

## 3.The root reducer may combine the output of multiple reducers into a single state tree.

Redux ships with a `combineReducers()` helper function, useful for “splitting” the root reducer into separate functions that each manage one branch of the state tree.

```javascript
function todos(state = [], action) {
   // Somehow calculate it...
   return nextState
 }

 function visibleTodoFilter(state = 'SHOW_ALL', action) {
   // Somehow calculate it...
   return nextState
 }

 let todoApp = combineReducers({
   todos,
   visibleTodoFilter
 });
```
## 4.The Redux store saves the complete state tree returned by the root reducer.

This new tree is now the next state of your app! Every listener registered with store.subscribe(listener) will now be invoked; listeners may call store.getState() to get the current state.

Now, the UI can be updated to reflect the new state. If you use bindings like React Redux, this is the point at which component.setState(newState) is called.