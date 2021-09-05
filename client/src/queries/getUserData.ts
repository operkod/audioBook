import endpoints from 'const/endpoints';
import { requestAsync } from 'redux-query';
import { IQueriesType } from './type';

const getUserData = ({ resultKey = 'userData', successCallback, errorCallback }: IQueriesType) =>
  requestAsync({
    url: endpoints.getUserUrl(),
    transform: ({ user }) => ({
      // eslint-disable-next-line no-underscore-dangle
      [resultKey]: { id: user._id, name: user.fullname, avatar: user.avatar },
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
