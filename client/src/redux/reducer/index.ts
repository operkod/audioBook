/*eslint-disable */
import { combineReducers } from 'redux';
import { audioReducer } from './audio';
import { userReducer } from './user';
import { commentsReducer } from './comments';
import { booksReducer } from './books';
import { settingsReducer } from './settings';
import { entitiesReducer, queriesReducer, QueriesState } from 'redux-query';

export const getQueries = (state: StateType) => state.queries
export const getEntities = (state: StateType) => state.entities

const rootReducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer,
  settings: settingsReducer,
  user: userReducer,
  audio: audioReducer,
  comments: commentsReducer,
  books: booksReducer,
});

export type StateType = ReturnType<typeof rootReducer>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<T extends { [key: string]: (...arg: any[]) => any }> = ReturnType<PropertiesTypes<T>>;

export default rootReducer;
