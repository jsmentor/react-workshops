import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, initialState);
}
