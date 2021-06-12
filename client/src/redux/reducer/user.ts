import { getToken } from "helpers/token"
import produce from "immer"
import { ActionsTypes } from "redux/action/user"

type initialStateType = typeof initialState
const initialUser = { id: '', avatar: '', fullname: "" }
export type ProfileTypes = {
  id: string
  avatar: string
  fullname: string
}
const initialState = {
  isAuth: !!getToken(),
  token: getToken(),
  data: initialUser as ProfileTypes
}

export const user = (state = initialState, action: ActionsTypes): initialStateType => {
  return produce(state, draft => {
    switch (action.type) {
      case 'USER@IS_AUTH':
        draft.isAuth = action.payload
        break
      case 'USER@SET_DATA':
        const { user, token } = action.payload
        draft.data = user
        draft.token = token
        break
      case 'USER@LOG_OUT':
        draft.data = initialUser
        draft.token = ''
        break
      default:
    }
  })
}
