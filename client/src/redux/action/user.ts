import { Dispatch } from "react"
import { ThunkDispatch } from "redux-thunk"
import { InferActionsTypes, StateType } from "redux/reducer"
import { ResponseAuth } from "api/user"
import { signIn, signUp, getMe, savePhoto } from "api/user"
import { removeToken } from "helpers/token"

export type ActionsTypes = InferActionsTypes<typeof Actions>

const Actions = {
  setIsAuth: (payload: boolean) => ({
    type: 'USER@IS_AUTH',
    payload
  } as const),
  setUserData: (payload: ResponseAuth) => ({
    type: 'USER@SET_DATA',
    payload
  } as const),
  setLogOut: () => ({
    type: 'USER@LOG_OUT',
  } as const)
}

// TODO
export const logOut = () => (dispatch: Dispatch<ActionsTypes>) => {
  removeToken()
  dispatch(Actions.setIsAuth(false))
  dispatch(Actions.setLogOut())
}
export const fetchUserLogin = (postData: any) => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    const { data } = await signIn(postData)
    dispatch(Actions.setUserData(data))
    dispatch(Actions.setIsAuth(true))
  } catch (e) {
    throw new Error(e.response.data.message)
  }
}
export const fetchUserRegister = (postData: any) => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    const { data } = await signUp(postData)
    dispatch(Actions.setUserData(data))
    dispatch(Actions.setIsAuth(true))
  } catch (e) {
    throw new Error(e.response.data.message)
  }
}
export const getUserProfile = () => async (dispatch: ThunkDispatch<StateType, {}, ActionsTypes>) => {
  try {
    const { data } = await getMe()
    dispatch(Actions.setUserData(data))
  } catch (e) {
    dispatch(logOut())
  }
}

export const updateAvatar = (fille: any) => async (dispatch: ThunkDispatch<StateType, {}, ActionsTypes>) => {
  const { data } = await savePhoto(fille)
  dispatch(Actions.setUserData(data))
}

export default Actions
