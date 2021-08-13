/*eslint-disable */
import { Actions } from 'redux/action/books';
import { getBook, setLike } from 'api/book';
import { openNotification } from 'helpers/openNotification';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import { AddBookType } from 'types';
import { getAuth } from 'redux/selectors';

function* workerRequestBook(action: any) {
  try {
    yield put(Actions.setBooksLoader(true));
    const { data } = yield call(getBook, action.payload);
    yield put(Actions.setBooks(data.books));
    yield put(Actions.setTotalNumberBooks(data.total));
  } catch (e) {
    openNotification({
      type: 'error',
      text: 'Произошла ошибка попробуйте ещё',
    });
  } finally {
    yield put(Actions.setBooksLoader(false));
  }
}

function fakeApi(time: number) {
  return new Promise((resolve) => setTimeout(() => resolve({ data: { name: '', author: '', description: '' }, time })));
}

function* workerRequestAddBook(action: { type: string; payload: AddBookType }) {
  try {
    const data: AddBookType = yield call(fakeApi, 2000);
    yield put(Actions.responseAddBook(data));
  } catch (e) {
    console.log('workerRequestAddBook :', e.message);
  }
}
function* workerRequestAddLike(action: { type: string; payload: string }) {
  const isAuth: boolean = yield select(getAuth);
  if (!isAuth) {
    return openNotification({
      title: 'Ошибка',
      text: 'Только авторизованные пользователи могут ставить лайки',
      type: 'warning',
    });
  }
  try {
    const { data } = yield call(setLike, action.payload);
    yield put(Actions.setLike(data));
  } catch (e) {
    openNotification({
      type: 'error',
      text: 'Произошла ошибка попробуйте ещё',
    });
  }
}

export function* sagaWatcherBook() {
  yield takeEvery('BOOKS@REQUEST_BOOK', workerRequestBook);
  yield takeEvery('BOOKS@REQUEST_ADD_BOOK', workerRequestAddBook);
  yield takeEvery('BOOKS@REQUEST_ADD_LIKE', workerRequestAddLike);
}
