import { AxiosResponse } from 'axios'
import axios from './'
import { BookType } from "types"
import { getToken } from 'helpers/token'

export type ResBooks = {
  books: Array<BookType>
  total: number
}
export type ResComment = {
  _id: string
  author: string
  text: string
}

const getBook = ({ page = 1, search = '' }): Promise<AxiosResponse<ResBooks>> => {
  let host = '/book?'
  if (page) {
    host = host + `page=${page}`
  }
  if (search) {
    host = host + `&search=${search}`
  }
  return axios.get(host)
}


const setBook = (book: any): Promise<AxiosResponse<ResBooks>> => axios.post(`/book/add`, book, {
  headers: {
    authorization: `Bearer ${getToken()}`
  }
})

const setBookComment = (postData: any): Promise<AxiosResponse<any>> => axios.post(`/book/addcomment`, postData, {
  headers: {
    authorization: `Bearer ${getToken()}`
  }
})

const getBookComment = (id: string): Promise<AxiosResponse<Array<ResComment>>> => axios.post(`/book/comment`, { id }, {
  headers: {
    authorization: `Bearer ${getToken()}`
  }
})

export { getBook, setBook, setBookComment, getBookComment }
