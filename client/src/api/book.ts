import { AxiosResponse } from 'axios'
import axios from './'
import { BookType } from "types"
import { getToken } from 'helpers/token'

const _getHeadersToken = () => ({
  headers: {
    authorization: `Bearer ${getToken()}`
  }
})
export type ResBooks = {
  books: Array<BookType>
  total: number
}
export type ResComment = {
  _id: string
  author: string
  text: string
}

// ===== TODO ======
const cacheRequests = new Map()
const getBook = async ({ page = 1, search }: { page?: number, search?: string }): Promise<AxiosResponse<ResBooks>> => {
  let host = `/book?page=${page}`
  if (search) {
    host = host + `&search=${search}`
  }
  if (!cacheRequests.has(host)) {
    const response = await axios.get(host, _getHeadersToken())
    cacheRequests.set(host, response)
  }
  return new Promise((resolve) => resolve(cacheRequests.get(host)))
}

const setBook = (book: any): Promise<AxiosResponse<ResBooks>> => axios.post(`/book/add`, book, _getHeadersToken())

const setBookComment = (postData: any): Promise<AxiosResponse<any>> => axios.post(`/book/addcomment`, postData, {
  headers: {
    authorization: `Bearer ${getToken()}`
  }
})

const getBookComment = (id: string): Promise<AxiosResponse<Array<ResComment>>> => axios.post(`/book/comment`, { id }, _getHeadersToken())
const setLike = (id: string): Promise<AxiosResponse<{ bookId: string, status: boolean }>> => axios.post(`/book/like`, { id }, _getHeadersToken())

export { getBook, setBook, setBookComment, getBookComment, setLike }
