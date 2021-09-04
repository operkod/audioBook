import endpoints from 'const/endpoints';
import { requestAsync } from 'redux-query';

export interface IGetUserDataParams {
  resultKey?: string;
  successCallback: Function;
  errorCallback: Function;
}

const getUserData = ({ resultKey = 'userData', successCallback, errorCallback }: IGetUserDataParams) =>
  requestAsync({
    url: endpoints.getUserUrl(),
    transform: ({ user }) => ({
      // eslint-disable-next-line no-underscore-dangle
      [resultKey]: { id: user._id, fullface: user.fullname, avatar: user.avatar },
    }),
    queryKey: endpoints.getUserUrl(),
    meta: {
      authToken: true,
      successCallback,
      errorCallback,
    },
    options: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    update: {
      [resultKey]: (_prevEntities: any, newEntities: any) => newEntities,
    },
  });

export default getUserData;
