import endpoints from 'const/endpoints';
import { requestAsync } from 'redux-query';

export interface IGetBooksParams {
  params: object;
  resultKey?: string;
  successCallback: Function;
  errorCallback: Function;
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
