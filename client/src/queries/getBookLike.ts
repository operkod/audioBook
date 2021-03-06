import endpoints from 'const/endpoints';
import { requestAsync } from 'redux-query';
import { IQueriesType } from './type';

export interface IGetBookLikeParams extends IQueriesType {
  id: string;
  checked: boolean;
}

const getBookLike = ({ id, checked, resultKey = 'bookLike', successCallback, errorCallback }: IGetBookLikeParams) =>
  requestAsync({
    url: endpoints.getBookLikeUrl(),
    transform: (response) => ({
      [resultKey]: response,
    }),
    queryKey: endpoints.getBookLikeUrl(),
    meta: {
      authToken: true,
      successCallback,
      errorCallback,
    },
    options: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    body: { id, checked },
    update: {
      [resultKey]: (_prevEntities: any, newEntities: any) => newEntities,
    },
  });

export default getBookLike;
