import { Actions } from 'redux/action/books'
import { getBook } from 'api/book'
import { openNotification } from 'helpers/openNotification'
import { put, call, takeEvery } from '@redux-saga/core/effects'

function* sagaWorker(action: any) {
  try {
    yield put(Actions.setBooksLoader(true))
    const { data } = yield call(getBook, action.payload)
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
  yield takeEvery("BOOKS@REQUEST_BOOK", sagaWorker)
}