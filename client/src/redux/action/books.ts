import { InferActionsTypes } from 'redux/reducer'
import { AddBookType, BookType } from 'types'

export type ActionsTypes = InferActionsTypes<typeof Actions>

export const Actions = {
  setBooks: (payload: Array<BookType>) => ({
    type: 'BOOKS@SET_ITEMS',
    payload
  } as const),
  setTotalNumberBooks: (payload: number) => ({
    type: 'BOOKS@SET_TOTAL_NUMBER_BOOKS',
    payload
  } as const),
  setBooksLoader: (payload: boolean) => ({
    type: 'BOOKS@IS_LOADER',
    payload
  } as const),
  searchValue: (payload: string) => ({
    type: 'BOOKS@SEARCH_VALUE',
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
  requestBook: (payload: { page?: number, search?: string }) => ({
    type: 'BOOKS@REQUEST_BOOK',
    payload
  } as const),
  requestAddBook: (payload: AddBookType) => ({
    type: 'BOOKS@REQUEST_ADD_BOOK',
    payload
  } as const),
  responseAddBook: (payload: AddBookType) => ({
    type: 'BOOKS@RESPONSE_ADD_BOOK',
    payload
  } as const),
}


