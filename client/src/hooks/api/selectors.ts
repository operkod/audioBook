import { getEntities, StateType, getUtils } from 'reducers';

const getSimpleResult = (initialValue: object) => (state: StateType, resultKey: string) =>
  getEntities(state)[resultKey] ?? initialValue;

export const objectSelector = getSimpleResult({});
export const arraySelector = getSimpleResult([]);

export const modalSelector = (state: StateType) => state.modal;

export const utilsSelector = (state: object, resultKey: string, initialValue?: any) =>
  getUtils(state)[resultKey] ?? initialValue;
