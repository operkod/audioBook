import endpoints from 'const/endpoints';
import { requestAsync } from 'redux-query';
import { IQueriesType } from './type';

export interface IGetBooksParams extends IQueriesType {
  id: string;
}

const getBooks = ({ id, resultKey = 'bookComments', successCallback, errorCallback }: IGetBooksParams) =>
  requestAsync({
    url: endpoints.getBookCommentUrl(),
    transform: (response) => ({
      [resultKey]: response,
    }),
    queryKey: endpoints.getBookCommentUrl(),
    meta: {
      successCallback,
      errorCallback,
    },
    body: { id },
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

export default getBooks;
