import { combineReducers } from 'redux';
import { entitiesReducer, queriesReducer, QueriesSelector, EntitiesSelector, EntitiesState } from 'redux-query';
import audioReducer from './audio';
import modalReducer from './modalReducer';
import utilsReducer from './utilsReducer';

export const getQueries: QueriesSelector<StateType> = (state: StateType) => state.queries;
export const getEntities: EntitiesSelector<EntitiesState, StateType> = (state: StateType) => state.entities;
export const getUtils: any = (state: any) => state.utils;

const rootReducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer,
  utils: utilsReducer,
  modal: modalReducer,
  audio: audioReducer,
});

export type StateType = ReturnType<typeof rootReducer>;

export default rootReducer;
