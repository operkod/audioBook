import { AxiosResponse } from 'axios'
import axios from 'core'
import { BookType } from "types"

export type ResBooks = {
  books: Array<BookType>
  total: number
}
export type ResComment = {
  _id: string
  author: string
  text: string
}

export type BookApiType = typeof bookApi

const bookApi = {
  getBook: ({ page = 1, search = '' }): Promise<AxiosResponse<ResBooks>> => {
    return axios.get(`/book?page=${page}&search=${search}`)
  },
  setBook: (book: any): Promise<AxiosResponse<ResBooks>> => {
    return axios.post(`/book/add`, book)
  },
  setBookComment: (postData: any): Promise<AxiosResponse<any>> => {
    return axios.post(`/book/addcomment`, postData)
  },
  getBookComment: (id: string): Promise<AxiosResponse<Array<ResComment>>> => {
    return axios.post(`/book/comment`, { id })
  }
}
export default bookApi
