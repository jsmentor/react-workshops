import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createHelpers from './createHelpers';
import createLogger from './logger';
import {beforeLoggerMiddleware, afterLoggerMiddleware} from './workshop-middleware';

export default function configureStore(initialState, helpersConfig) {
  const helpers = createHelpers(helpersConfig);
  const middlewares = [
    thunk.withExtraArgument(helpers),
    beforeLoggerMiddleware,
    afterLoggerMiddleware,
  ];

  let enhancer;

  if (__DEV__) {
    middlewares.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(...middlewares),
      devToolsExtension,
    );
  } else {
    enhancer = applyMiddleware(...middlewares);
  }

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers').default),
    );
  }

  return store;
}
