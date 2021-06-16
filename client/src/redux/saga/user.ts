import Actions from 'redux/action/user'
import { openNotification } from 'helpers/openNotification'
import { put, call, takeEvery } from '@redux-saga/core/effects'
import { removeToken, setToken } from 'helpers/token'
import { LoginFormType } from 'types'
import { getMe, savePhoto, signIn, signUp } from 'api/user'

function* workerLogout() {
  yield removeToken()
  yield put(Actions.setIsAuth(false))
}

function* workerAuthorization(action: { type: string, payload: LoginFormType }) {
  yield put(Actions.isLoader(true))
  try {
    const { data } = yield call(signIn, action.payload)
    yield setToken(data.token)
    yield put(Actions.setUserData(data.user))
    yield put(Actions.setIsAuth(true))
  } catch (e) {
    openNotification({
      type: 'error',
      title: 'Authorization',
      text: e.response.data.message
    })
  } finally {
    yield put(Actions.isLoader(false))
  }
}

function* workerRegistration(action: any) {
  yield put(Actions.isLoader(true))
  try {
    const { data } = yield call(signUp, action.payload)
    yield setToken(data.token)
    yield put(Actions.setUserData(data.user))
    yield put(Actions.setIsAuth(true))
  } catch (e) {
    openNotification({
      type: 'error',
      title: 'Registration',
      text: e.response.data.message
    })
  } finally {
    yield put(Actions.isLoader(false))
  }
}

function* workerProfile() {
  try {
    const { data } = yield call(getMe)
    yield setToken(data.token)
    yield put(Actions.setUserData(data.user))
    yield put(Actions.setIsAuth(true))
  } catch (e) {
    yield put(Actions.logOut())
  }
}

function* workerUpdateAvatar(action: any) {
  try {
    const { data } = yield call(savePhoto, action.payload)
    yield put(Actions.setUserData(data.user))
  } catch (e) {
    openNotification({
      type: 'error',
      title: 'Avatar',
      text: 'ошибка при сохранение авата, попробуйте ещо раз'
    })
  }
}

export function* watcherUser() {
  yield takeEvery('USER@LOG_OUT', workerLogout)
  yield takeEvery('USER@AUTHORIZATION', workerAuthorization)
  yield takeEvery('USER@REGISTRATION', workerRegistration)
  yield takeEvery('USER@PROFILE', workerProfile)
  yield takeEvery('USER@UPDATE_AVATAR', workerUpdateAvatar)
}