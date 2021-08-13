/*eslint-disable */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import { rootWatcher } from './saga';
import logger from 'redux-logger';

const saga = createSagaMiddleware();

const middleware = [thunk, saga, logger];
const rootStore = createStore(rootReducer, applyMiddleware(...middleware));

saga.run(rootWatcher);

export default rootStore;
