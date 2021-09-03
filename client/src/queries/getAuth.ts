// import endpoints from 'consts/endpoints';
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
    url: `${process.env.REACT_APP_BASE_URL}/user/signin`,
    transform: ({ token, useData, ...response }) => ({
      [resultKey]: {
        token,
        useData,
        ...response,
      },
    }),
    queryKey: `${process.env.REACT_APP_BASE_URL}/user/signin`,
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
