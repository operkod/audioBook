import endpoints from 'const/endpoints';
import { requestAsync } from 'redux-query';

export interface IGetSignUpParams {
  email: string;
  password: string;
  fullname: string;
  password_2: string;
  resultKey?: string;
  successCallback: Function;
  errorCallback: Function;
}

const getSingUp = ({
  email = '',
  fullname = '',
  password = '',
  password_2 = '',
  resultKey = 'signUpData',
  successCallback,
  errorCallback,
}: IGetSignUpParams) =>
  requestAsync({
    url: endpoints.getSingUpUrl(),
    transform: ({ token, useData, ...response }) => ({
      [resultKey]: {
        token,
        ...response,
      },
    }),
    queryKey: endpoints.getSingUpUrl(),
    body: {
      email,
      fullname,
      password,
      password_2,
    },
    meta: {
      successCallback,
      errorCallback,
    },
    options: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    update: {
      [resultKey]: (_prevEntities: any, newEntities: any) => newEntities,
    },
  });

export default getSingUp;
