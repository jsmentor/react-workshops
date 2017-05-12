import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createHelpers from './createHelpers';
import {beforeLoggerMiddleware, afterLoggerMiddleware} from './workshop-middleware';
export default function configureStore(initialState, helpersConfig) {
  // const helpers = createHelpers(helpersConfig);

  const middlewares = [
    thunk,
    beforeLoggerMiddleware,
    afterLoggerMiddleware
  ];
  let enhancer = applyMiddleware(...middlewares);

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, initialState, enhancer);
}
