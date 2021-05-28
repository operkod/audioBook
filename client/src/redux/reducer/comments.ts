import produce from "immer"
import { ActionsTypes } from "redux/action/comments"
import { CommentsType } from "types"


type initialStateType = typeof initialState
const initialState = {
  id: "",
  items: [] as Array<CommentsType>,
  isShow: false,
  isLoader: false
}



export const comments = (state = initialState, action: ActionsTypes): initialStateType => {
  return produce(state, draft => {
    switch (action.type) {
      case "COMMENTS@IS_SHOW":
        draft.isShow = action.payload
        break
      case "COMMENTS@SET_ID":
        draft.id = action.payload
        break
      case "COMMENTS@SET_ITEM":
        draft.items = action.payload
        break
      case "COMMENTS@IS_LOADER":
        draft.isLoader = action.payload
        break
      case "COMMENTS@ADD_ITEM":
        draft.items.push(action.payload)
        break
      default:
    }
  })
}
