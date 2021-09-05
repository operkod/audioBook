export const SET_PARAMS_QUERY_BOOKS = 'SET_PARAMS_QUERY_BOOKS';
export const SET_MODAL = 'SET_MODAL';
export const UPDATE_UTILS = 'UPDATE_UTILS';

export const setParamsQueryBooks = (params: object) => ({
  type: SET_PARAMS_QUERY_BOOKS,
  payload: params,
});

export const setModal = (params: object) => ({
  type: SET_MODAL,
  payload: params,
});

export const updateUtils = (payload: object) => ({
  type: UPDATE_UTILS,
  payload,
});
