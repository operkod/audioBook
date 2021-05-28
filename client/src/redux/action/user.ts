import { Dispatch } from "react"
import { ThunkDispatch } from "redux-thunk"
import { InferActionsTypes, StateType } from "redux/reducer"
import { ResponseAuth } from "utils/api/user"
import userApi from "utils/api/user"


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

export const logOut = () => (dispatch: Dispatch<ActionsTypes>) => {
  window.localStorage.clear()
  window.axios.defaults.headers.authorization = null
  dispatch(Actions.setIsAuth(false))
  dispatch(Actions.setLogOut())
}
export const fetchUserLogin = (postData: any) => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    const { data } = await userApi.signIn(postData)
    dispatch(Actions.setUserData(data))
    dispatch(Actions.setIsAuth(true))
  } catch (e) {
    throw new Error(e.response.data.message)
  }
}
export const fetchUserRegister = (postData: any) => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    const { data } = await userApi.signUp(postData)
    dispatch(Actions.setUserData(data))
    dispatch(Actions.setIsAuth(true))
  } catch (e) {
    throw new Error(e.response.data.message)
  }
}
export const getUserProfile = () => async (dispatch: ThunkDispatch<StateType, {}, ActionsTypes>) => {
  try {
    const { data } = await userApi.getMe()
    dispatch(Actions.setUserData(data))
  } catch (e) {
    dispatch(logOut())
  }
}

export const updateAvatar = (fille: any) => async (dispatch: ThunkDispatch<StateType, {}, ActionsTypes>) => {
  const { data } = await userApi.savePhoto(fille)
  dispatch(Actions.setUserData(data))
}

export default Actions
