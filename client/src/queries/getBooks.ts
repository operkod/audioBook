import endpoints from 'const/endpoints';
import { requestAsync } from 'redux-query';
import { IQueriesType } from './type';

export interface IGetBooksParams extends IQueriesType {
  params: object;
}

const getBooks = ({ params, resultKey = 'booksData', successCallback, errorCallback }: IGetBooksParams) =>
  requestAsync({
    url: endpoints.getBooksUrl(params),
    transform: (response) => ({
      [resultKey]: response,
    }),
    queryKey: endpoints.getBooksUrl(params),
    meta: {
      authToken: true,
      successCallback,
      errorCallback,
    },
    options: {
      headers: {
        Accept: 'application/json',
      },
    },
    update: {
      [resultKey]: (_prevEntities: any, newEntities: any) => newEntities,
    },
  });

export default getBooks;
