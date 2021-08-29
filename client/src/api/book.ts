/* eslint-disable */
import { AxiosResponse } from 'axios';
import { BookType } from "types";
import { getToken } from 'helpers/token';
import axios from './';
import getParams from 'helpers/getParams';

const getHeadersToken = () => ({
  headers: {
    authorization: `Bearer ${getToken()}`,
  },
});
export type ResBooks = {
  books: Array<BookType>;
  total: number;
};
export type ResComment = {
  _id: string;
  author: string;
  text: string;
};

const fetchBooks = (params: object): Promise<AxiosResponse<ResBooks>> => axios.get(`/book${getParams(params)}`, getHeadersToken())


const setBook = (book: any): Promise<AxiosResponse<ResBooks>> => axios.post(`/book/add`, book, getHeadersToken());

const setBookComment = (postData: any): Promise<AxiosResponse<any>> => axios.post(`/book/addcomment`, postData, {
  headers: {
    authorization: `Bearer ${getToken()}`
  }
});

const getBookComment = (id: string): Promise<AxiosResponse<Array<ResComment>>> => axios.post(`/book/comment`, { id }, getHeadersToken());
const setLike = (id: string): Promise<AxiosResponse<{ bookId: string, status: boolean }>> => axios.post(`/book/like`, { id }, getHeadersToken());

export { fetchBooks, setBook, setBookComment, getBookComment, setLike };
