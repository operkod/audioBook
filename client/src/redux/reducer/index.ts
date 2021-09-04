/*eslint-disable */
import { combineReducers } from 'redux';
import { audioReducer } from './audio';
import { commentsReducer } from './comments';
import { settingsReducer } from './settings';
import queryParams from './queryParams';
import { entitiesReducer, queriesReducer, QueriesSelector, EntitiesSelector, EntitiesState } from 'redux-query';

export const getQueries: QueriesSelector<StateType> = (state: StateType) => state.queries
export const getEntities: EntitiesSelector<EntitiesState, StateType> = (state: StateType) => state.entities

const rootReducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer,
  settings: settingsReducer,
  audio: audioReducer,
  comments: commentsReducer,
  queryParams
});

export type StateType = ReturnType<typeof rootReducer>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<T extends { [key: string]: (...arg: any[]) => any }> = ReturnType<PropertiesTypes<T>>;

export default rootReducer;
