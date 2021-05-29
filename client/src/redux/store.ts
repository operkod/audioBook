import { authStorage } from "middleware"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducer"
import { rootWatcher } from "./saga"



const saga = createSagaMiddleware()

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = [thunk, authStorage, saga]
//@ts-ignore
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

saga.run(rootWatcher)

export default store
