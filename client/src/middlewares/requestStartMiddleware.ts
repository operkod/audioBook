import { actionTypes } from 'redux-query';

// Добавляем стандартные поля к каждому запросу:

export default () => (next: any) => (action: any) => {
  if (action.type === actionTypes.REQUEST_ASYNC || action.type === actionTypes.MUTATE_ASYNC) {
    const callAPI = action;

    if (!action.force) {
      callAPI.force = true;
    }

    if (!action.meta) {
      callAPI.meta = {};
    }

    if (!action.update) {
      callAPI.update = {};
    }
  }

  return next(action);
};
