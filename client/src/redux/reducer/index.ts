import { combineReducers } from 'redux'
import { audio } from './audio'
import { user } from './user'
import { comments } from './comments'
import { books } from './books'
import { settingsReducer } from './settings'

const rootReducer = combineReducers({
  settings: settingsReducer,
  user,
  audio,
  comments,
  books
})

export type StateType = ReturnType<typeof rootReducer>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionsTypes<T extends { [key: string]: (...arg: any[]) => any }> = ReturnType<PropertiesTypes<T>>

export default rootReducer
