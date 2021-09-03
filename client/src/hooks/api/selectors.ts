import { getEntities } from 'redux/reducer';

const getSimpleResult = (initialValue: any) => (state: any, resultKey: string) =>
  getEntities(state)[resultKey] ?? initialValue;

export const objectSelector = getSimpleResult({});
export const arraySelector = getSimpleResult([]);

export const primitiveSelector = (state: any, resultKey: string, initialValue?: any) =>
  getEntities(state)[resultKey] ?? initialValue;

// export const utilsSelector = (state: object, resultKey: string, initialValue?: any) =>
//   getUtils(state)[resultKey] ?? initialValue;
