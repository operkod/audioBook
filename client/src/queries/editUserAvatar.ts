import endpoints from 'const/endpoints';
import { requestAsync } from 'redux-query';
import { IQueriesType } from './type';

export interface IGetUserAvatarParams extends IQueriesType {
  file: any;
}

const editUserAvatar = ({ file, resultKey = 'userAvatar', successCallback, errorCallback }: IGetUserAvatarParams) =>
  requestAsync({
    url: endpoints.getUserAvatarUrl(),
    transform: (response) => ({
      [resultKey]: response,
    }),
    queryKey: endpoints.getUserAvatarUrl(),
    body: file,
    meta: {
      authToken: true,
      successCallback,
      errorCallback,
    },
    options: {
      method: 'POST',
      headers: {
        Accept: 'multipart/form-data',
      },
    },
    update: {
      [resultKey]: (_prevEntities: any, newEntities: any) => newEntities,
    },
  });

export default editUserAvatar;
