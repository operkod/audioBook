import { combineReducers } from 'redux'
import { audio } from './audio'
import { user } from './user'
import { comments } from './comments'
import { books } from './books'

const rootReducer = combineReducers({
  user,
  audio,
  comments,
  books
})

type rootReducerType = typeof rootReducer
export type StateType = ReturnType<rootReducerType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionsTypes<T extends { [key: string]: (...arg: any[]) => any }> = ReturnType<PropertiesTypes<T>>

export default rootReducer

