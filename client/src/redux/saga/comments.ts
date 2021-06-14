import { getBookComment, setBookComment } from "api/book"
import { openNotification } from 'helpers/openNotification'
import { Actions as ActionsBooks } from 'redux/action/books'
import { call, put, select, takeEvery } from "@redux-saga/core/effects"
import { getAuth, getCommentsCount } from "redux/selectors"
import { Actions } from "redux/action/comments"

function* sagaWorkerComment(action: { type: string, payload: string }) {
  const isAuth: boolean = yield select(getAuth)
  if (!isAuth) {
    openNotification({
      title: 'Ошибка',
      text: 'Только овтаризованые пользователи могут оставлять коментарии',
      type: 'warning'
    })
    const countMessage: number = yield select(getCommentsCount)

    if (countMessage < 0) {
      return openNotification({
        title: 'Ошибкa',
        text: 'Коментарий нет, ',
        type: 'warning'
      })
    }
  }

  try {
    yield put(Actions.isShowComments(true))
    yield put(Actions.isLoader(true))
    yield put(Actions.setCommentId(action.payload))
    const { data } = yield call(getBookComment, action.payload)
    yield put(Actions.setComments(data))
    yield put(Actions.isLoader(false))
  } catch (e) {
    openNotification({
      type: 'error',
      text: 'Произошла ошибка попробуйте ещё'
    })
    yield put(Actions.isShowComments(false))
    yield put(Actions.isLoader(false))
  }
}


function* sagaWorkerAddComment(action: any) {
  const { comments } = yield select()
  const createComment = {
    bookId: comments.id,
    text: action.payload
  }
  try {
    const { data } = yield call(setBookComment, createComment)
    yield put(Actions.addComment(data))
    yield put(ActionsBooks.addCountBook(comments.id))
  } catch (e) {
    openNotification({
      type: 'error',
      text: 'Произошла ошибка попробуйте при отправки сообщения '
    })
  }
}

export function* sagaWatcherComment() {
  yield takeEvery("COMMENT@REQUEST_ADD_ITEM", sagaWorkerAddComment)
  yield takeEvery("COMMENT@REQUEST_ITEM", sagaWorkerComment)

}