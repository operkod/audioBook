import { InferActionsTypes } from 'redux/reducer'
import { ResponseAuth } from 'api/user'
import { LoginFormType, RegistrationFormType } from 'types'

export type ActionsTypes = InferActionsTypes<typeof Actions>

const Actions = {
  isLoader: (payload: boolean) => ({
    type: 'USER@LOADER',
    payload
  } as const),
  setIsAuth: (payload: boolean) => ({
    type: 'USER@IS_AUTH',
    payload
  } as const),
  setUserData: (payload: ResponseAuth) => ({
    type: 'USER@SET_DATA',
    payload
  } as const),
  logOut: () => ({
    type: 'USER@LOG_OUT',
  } as const),
  fetchAuthorization: (payload: LoginFormType) => ({
    type: 'USER@AUTHORIZATION',
    payload
  } as const),
  fetchRegistration: (payload: RegistrationFormType) => ({
    type: 'USER@REGISTRATION',
    payload
  } as const),
  userProfile: (payload: any) => ({
    type: 'USER@PROFILE',
    payload
  } as const),
  updateAvatar: (payload: any) => ({
    type: 'USER@UPDATE_AVATAR',
    payload
  } as const),
}

export default Actions
