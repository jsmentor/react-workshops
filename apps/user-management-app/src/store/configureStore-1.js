import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  let enhancer = applyMiddleware(thunk);
  // what if we have more than one middlewares
  // const middlewares = [thunk];
  // let enhancer = applyMiddleware(middlewares);

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, initialState, enhancer);
}
