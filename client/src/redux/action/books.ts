import { ThunkDispatch } from 'redux-thunk'
import { InferActionsTypes, StateType } from 'redux/reducer'
import bookApi, { BookApiType } from 'utils/api/book'
import { BookType } from "types"
import { openNotification } from 'utils/helpers/openNotification'

import { call, put, select, takeEvery } from "redux-saga/effects"

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
    type: "BOOKS@REQUEST_BOOK",
    payload
  } as const)
}


function* sagaWorker(action: any) {
  try {
    yield put(Actions.setBooksLoader(true))
    const { data } = yield call(bookApi.getBook, action.payload)
    yield put(Actions.setBooks(data.books))
    yield put(Actions.setTotalNumberBooks(data.total))
    yield put(Actions.setBooksLoader(false))
  } catch (e) {
    openNotification({
      type: 'error',
      text: 'Произошла ошибка попробуйте ещё'
    })
  }
}



export function* sagaWatcherBook() {
  //@ts-ignore
  yield takeEvery("BOOKS@REQUEST_BOOK", sagaWorker)
}
