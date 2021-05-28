import { AxiosResponse } from 'axios'
import axios from 'core'
import { BookType } from "types"

export type ResBooks = {
  books: Array<BookType>
  total: number
}
const bookApi = {
  getBook: ({ page = 1, search = '' }): Promise<AxiosResponse<any>> => axios.get(`/book?page=${page}&search=${search}`),
  setBook: (book: any): Promise<AxiosResponse<ResBooks>> => axios.post(`/book/add`, book),
  setBookComment: (postData: any): Promise<AxiosResponse<any>> => axios.post(`/book/addcomment`, postData),
  getBookComment: (id: string): Promise<AxiosResponse<any>> => axios.post(`/book/comment`, { id })
}
export default bookApi
