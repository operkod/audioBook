import { ThunkDispatch } from "redux-thunk"
import { InferActionsTypes, StateType } from "redux/reducer"
import { CommentsType } from "types"
import bookApi from "utils/api/book"
import { openNotification } from 'utils/helpers/openNotification'

import { Actions as ActionsBooks, ActionsTypes as ActionsBooksTypes } from 'redux/action/books'
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


export const fetchComments = (id: string) => {
  return async (dispatch: ThunkDispatch<StateType, {}, ActionsTypes | ActionsBooksTypes>, getState: () => StateType) => {
    const isAuth = getState().user.isAuth
    if (!isAuth) {
      openNotification({
        title: 'Ошибка',
        text: 'Только овтаризованые пользователи могут оставлять коментарии',
        type: 'warning'
      })
      const countMessage = getState().books.items.find(el => el._id === id)?.comments.length
      if (!countMessage) {
        return openNotification({
          title: '',
          text: 'Коментарий нет, ',
          type: 'warning'
        })
      }
    }

    try {
      dispatch(Actions.isShowComments(true))
      dispatch(Actions.isLoader(true))
      dispatch(Actions.setCommentId(id))
      const { data } = await bookApi.getBookComment(id)
      dispatch(Actions.setComments(data))
      dispatch(Actions.isLoader(false))
    } catch (e) {
      openNotification({
        type: 'error',
        text: 'Произошла ошибка попробуйте ещё fetchComments'
      })
    }
  }
}
export const fetchAddComment = (text: string) => {
  return async (dispatch: ThunkDispatch<StateType, {}, ActionsTypes | ActionsBooksTypes>, getState: () => StateType) => {
    const { comments } = getState()
    const createComment = {
      bookId: comments.id,
      text,
    }
    try {
      const { data } = await bookApi.setBookComment(createComment)
      console.log('response :', data)
      dispatch(Actions.addComment(data))
      dispatch(ActionsBooks.addCountBook(comments.id))
    } catch (e) {
      openNotification({
        type: 'error',
        text: 'Произошла ошибка попробуйте ещё'
      })
    }
  }
}
