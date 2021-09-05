import endpoints from 'const/endpoints';
import { requestAsync } from 'redux-query';
import { IQueriesType } from './type';

export interface IGetBookCommentParams extends IQueriesType {
  postData: { bookId: string; text: string };
}

const addBookComment = ({
  postData,
  resultKey = 'addBookComment',
  successCallback,
  errorCallback,
}: IGetBookCommentParams) =>
  requestAsync({
    url: endpoints.getBookAddCommentUrl(),
    transform: (response) => ({
      [resultKey]: response,
    }),
    queryKey: endpoints.getBookAddCommentUrl(),
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
    body: postData,
    update: {
      [resultKey]: (_prevEntities: any, newEntities: any) => newEntities,
    },
  });

export default addBookComment;
