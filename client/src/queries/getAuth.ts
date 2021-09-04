import endpoints from 'const/endpoints';
import { requestAsync } from 'redux-query';

export interface IGetAuthParams {
  email: string;
  password: string;
  resultKey?: string;
  successCallback: Function;
  errorCallback: Function;
}

const getAuth = ({
  email = '',
  password = '',
  resultKey = 'authData',
  successCallback,
  errorCallback,
}: IGetAuthParams) =>
  requestAsync({
    url: endpoints.getAuthUrl(),
    transform: (response) => ({
      [resultKey]: response,
    }),
    queryKey: endpoints.getAuthUrl(),
    body: {
      email,
      password,
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

export default getAuth;
