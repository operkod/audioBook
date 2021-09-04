import endpoints from 'const/endpoints';
import { requestAsync } from 'redux-query';

export interface IGetBookLikeParams {
  id: string;
  checked: boolean;
  resultKey?: string;
  successCallback: Function;
  errorCallback: Function;
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
