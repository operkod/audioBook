import { authStorage } from "middleware"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducer"

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = [thunk, authStorage]
//@ts-ignore
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

export default store
