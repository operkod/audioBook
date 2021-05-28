import { ThunkDispatch } from 'redux-thunk'
import { InferActionsTypes, StateType } from 'redux/reducer'
import bookApi from 'utils/api/book'
import { BookType } from "types"
import { openNotification } from 'utils/helpers/openNotification'

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
  } as const)
}

export const fetchBooks = ({ page, search }: { page?: number, search?: string }) =>
  async (dispatch: ThunkDispatch<StateType, {}, ActionsTypes>) => {
    try {
      dispatch(Actions.setBooksLoader(true))
      const { data } = await bookApi.getBook({ page, search })
      dispatch(Actions.setBooks(data.books))
      dispatch(Actions.setTotalNumberBooks(data.total))
      dispatch(Actions.setBooksLoader(false))
    } catch (e) {
      openNotification({
        type: 'error',
        text: 'Произошла ошибка попробуйте ещё'
      })
    }
  }
