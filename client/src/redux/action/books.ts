/*eslint-disable */
import { InferActionsTypes } from 'redux/reducer'
import { AddBookType, BookType } from 'types'

export type ActionsTypes = InferActionsTypes<typeof Actions>

export const Actions = {
  setBooks: (payload: Array<BookType>) => ({
    type: 'BOOKS@SET_ITEMS',
    payload
  } as const),
  setParams: (payload: object) => ({
    type: 'BOOKS@PARAMS',
    payload
  } as const),
  setBooksLoader: (payload: boolean) => ({
    type: 'BOOKS@IS_LOADER',
    payload
  } as const),
  addCountBook: (payload: string) => ({
    type: 'BOOKS@ADD_COMMENT',
    payload
  } as const),
  addCommentBookError: (payload: string) => ({
    type: 'BOOKS@ADD_COMMENT_ERROR',
    payload
  } as const),
  requestBook: () => ({
    type: 'BOOKS@REQUEST_BOOK',
  } as const),
  requestAddBook: (payload: AddBookType) => ({
    type: 'BOOKS@REQUEST_ADD_BOOK',
    payload
  } as const),
  responseAddBook: (payload: AddBookType) => ({
    type: 'BOOKS@RESPONSE_ADD_BOOK',
    payload
  } as const),
  requestAddLike: (payload: any) => ({
    type: 'BOOKS@REQUEST_ADD_LIKE',
    payload
  } as const),
  setLike: (payload: { bookId: string, status: boolean }) => ({
    type: 'BOOKS@SET_LIKE',
    payload
  } as const)
}
