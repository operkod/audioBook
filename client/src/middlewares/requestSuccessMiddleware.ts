import { actionTypes } from 'redux-query';
import { toast } from 'react-toastify';
import i18n from 'i18next';

// Если передан meta.successCallback, он будет вызван.

export default () => (next: any) => (action: any) => {
  if (action.type === actionTypes.REQUEST_SUCCESS) {
    const { successCallback, showSuccess } = action.meta;

    if (showSuccess) {
      toast(i18n.t('global.messages.ok'));
    }

    if (successCallback) {
      successCallback(action.responseBody, action);
    }
  }

  return next(action);
};
