/*eslint-disable */
import { createStore, applyMiddleware } from 'redux';
import { queryMiddleware } from 'redux-query';
import superagentInterface from 'redux-query-interface-superagent';
import rootReducer, { getEntities, getQueries } from './reducer';
// import createSagaMiddleware from 'redux-saga';
// import { rootWatcher } from './saga';
import logger from 'redux-logger';



const configurationStore = () => {
  let customMiddlewares = [
    // requestStartMiddleware,
    // authTokenMiddleware,
    // requestFailureMiddleware,
    // requestSuccessMiddleware,
    queryMiddleware(superagentInterface, getQueries, getEntities),
  ];
  if (process.env.NODE_ENV !== 'production') {
    customMiddlewares = [...customMiddlewares, logger]
  }
  const middlewares = applyMiddleware(...customMiddlewares)

  return createStore(rootReducer, middlewares)
}

// const saga = createSagaMiddleware();
// const middleware = [saga, logger];
const rootStore: any = configurationStore();

// saga.run(rootWatcher);

export default rootStore;
