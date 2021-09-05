import { createStore, applyMiddleware } from 'redux';
import { queryMiddleware } from 'redux-query';
import superagentInterface from 'redux-query-interface-superagent';
import logger from 'redux-logger';
import requestSuccessMiddleware from 'middlewares/requestSuccessMiddleware';
import requestFailureMiddleware from 'middlewares/requestFailureMiddleware';
import requestStartMiddleware from 'middlewares/requestStartMiddleware';
import authTokenMiddleware from 'middlewares/authTokenMiddleware';
import rootReducer, { getEntities, getQueries } from 'reducers';

const configurationStore = () => {
  let customMiddlewares = [
    authTokenMiddleware,
    requestStartMiddleware,
    requestSuccessMiddleware,
    requestFailureMiddleware,
    queryMiddleware(superagentInterface, getQueries, getEntities),
  ];
  if (process.env.NODE_ENV !== 'production') {
    customMiddlewares = [...customMiddlewares, logger];
  }
  const middlewares = applyMiddleware(...customMiddlewares);

  return createStore(rootReducer, middlewares);
};

const store = configurationStore();

export default store;
