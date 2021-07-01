import produce from "immer"
import { ActionsTypes } from "redux/action/books"
import { BookType } from "types"


export type InitialStateType = typeof initialState

const initialState = {
  items: [] as Array<BookType>,
  total: 0,
  searchValue: null as null | string,
  page: null as null | number,
  isLoader: false
}

export const books = (state = initialState, action: ActionsTypes): InitialStateType => {
  return produce(state, draft => {
    switch (action.type) {
      case "BOOKS@SET_ITEMS":
        draft.items = action.payload
        break
      case "BOOKS@IS_LOADER":
        draft.isLoader = action.payload
        break
      case "BOOKS@SET_PAGE":
        draft.page = action.payload
        break
      case "BOOKS@SET_TOTAL_NUMBER_BOOKS":
        draft.total = action.payload
        break
      case "BOOKS@SEARCH_VALUE":
        draft.searchValue = action.payload
        break
      case "BOOKS@ADD_COMMENT": {
        const index = draft.items.findIndex(el => el._id === action.payload)
        draft.items[index].comments.push(action.payload)
        break
      }
      case "BOOKS@ADD_COMMENT_ERROR":
        const index = draft.items.findIndex(el => el._id === action.payload)
        draft.items[index].comments.pop()
        break
      default:
    }
  })
}
