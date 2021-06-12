import { AxiosResponse } from 'axios'
import { getToken } from 'helpers/token'
import axios from './'

export type UserDate = {
  id: string
  avatar: string
  fullname: string
}

export type ResponseAuth = {
  token: string
  user: UserDate
}
export type signInType = {
  email: string
  password: string
}

const getMe = (): Promise<AxiosResponse<ResponseAuth>> => axios.get('/user/getme', {
  headers: {
    authorization: `Bearer ${getToken()}`
  }
})
const signIn = (postData: signInType): Promise<AxiosResponse<ResponseAuth>> => axios.post('/user/signin', postData, {
  headers: {
    authorization: `Bearer ${getToken()}`
  }
})
const signUp = (postData: any): Promise<AxiosResponse<ResponseAuth>> => axios.post('/user/signup', postData, {
  headers: {
    authorization: `Bearer ${getToken()}`
  }
})
const savePhoto = (photoFile: any): Promise<AxiosResponse<any>> => {
  const formData = new FormData()
  formData.append("image", photoFile)
  return axios.post('user/photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${getToken()}`
    }
  })
}


export { getMe, signIn, signUp, savePhoto }
