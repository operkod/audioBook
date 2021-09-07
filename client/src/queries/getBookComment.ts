import endpoints from 'const/endpoints';
import { requestAsync } from 'redux-query';
import { IQueriesType } from './type';

export interface IGetBooksParams extends IQueriesType {
  id: string;
}

const getBookComment = ({ id, resultKey = 'bookComments', successCallback, errorCallback }: IGetBooksParams) =>
  requestAsync({
    url: endpoints.getBookCommentUrl(id),
    transform: (response) => ({
      [resultKey]: response,
    }),
    queryKey: endpoints.getBookCommentUrl(id),
    meta: {
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

export default getBookComment;
