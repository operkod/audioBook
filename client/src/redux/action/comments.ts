import { ThunkDispatch } from "redux-thunk"
import { InferActionsTypes, StateType } from "redux/reducer"
import { CommentsType } from "types"
import bookApi from "utils/api/book"
import { openNotification } from 'utils/helpers/openNotification'

import { Actions as ActionsBooks, ActionsTypes as ActionsBooksTypes } from 'redux/action/books'
import { call, put, select, takeEvery } from "@redux-saga/core/effects"
export type ActionsTypes = InferActionsTypes<typeof Actions>

export const Actions = {
  isShowComments: (payload: boolean) => ({
    type: 'COMMENTS@IS_SHOW',
    payload
  } as const),
  setComments: (payload: Array<CommentsType>) => ({
    type: 'COMMENTS@SET_ITEM',
    payload
  } as const),
  setCommentId: (payload: string) => ({
    type: 'COMMENTS@SET_ID',
    payload
  } as const),
  addComment: (payload: CommentsType) => ({
    type: 'COMMENTS@ADD_ITEM',
    payload
  } as const),
  isLoader: (payload: boolean) => ({
    type: 'COMMENTS@IS_LOADER',
    payload
  } as const)
}


export const fetchComments = (payload: string) => ({
  type: "COMMENT@REQUEST_ITEM",
  payload
}
)
function* sagaWorkerComment(action: { type: string, payload: string }) {
  //@ts-ignore
  const isAuth = yield select((state: StateType) => state.user.isAuth)
  if (!isAuth) {
    openNotification({
      title: 'Ошибка',
      text: 'Только овтаризованые пользователи могут оставлять коментарии',
      type: 'warning'
    })
    // @ts-ignore
    const countMessage = yield select((sate: StateType) => {
      return sate.books.items.find(el => el._id === action.payload)?.comments.length
    })
    if (countMessage < 0) {
      return openNotification({
        title: '',
        text: 'Коментарий нет, ',
        type: 'warning'
      })
    }
  }

  try {
    yield put(Actions.isShowComments(true))
    yield put(Actions.isLoader(true))
    yield put(Actions.setCommentId(action.payload))
    const { data } = yield call(bookApi.getBookComment, action.payload)
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


export const fetchAddComment = (payload: string) => ({
  type: "COMMENT@REQUEST_ADD_ITEM",
  payload
})


function* sagaWorkerAddComment(action: any) {
  const { comments } = yield select()
  const createComment = {
    bookId: comments.id,
    text: action.payload
  }
  try {
    const { data } = yield call(bookApi.setBookComment, createComment)
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