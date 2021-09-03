import { actionTypes } from 'redux-query';
import { removeToken } from 'helpers/token';
import { toast } from 'react-toastify';

// Если передан meta.errorCallback, он будет вызван.

export default () => (next: any) => (action: any) => {
  if (action.type === actionTypes.REQUEST_FAILURE) {
    const { errorCallback, withoutErrorText } = action.meta;
    if (action.status === 401) {
      removeToken();
    }

    if (!withoutErrorText) {
      let errorText: string = 'Errors';
      if (action?.responseBody) {
        errorText = action?.responseBody.message;
      }

      toast.error(errorText);
    }

    if (errorCallback) {
      errorCallback(action.responseBody, action);
    }
  }

  return next(action);
};
