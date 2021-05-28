import { AxiosResponse } from "axios"
import axios from "core"

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


const userApi = {
  getMe: (): Promise<AxiosResponse<ResponseAuth>> => axios.get('/user/getme'),
  signIn: (postData: signInType): Promise<AxiosResponse<ResponseAuth>> => axios.post('/user/signin', postData),
  signUp: (postData: any): Promise<AxiosResponse<ResponseAuth>> => axios.post('/user/signup', postData),
  savePhoto: (photoFile: any): Promise<AxiosResponse<any>> =>  {
    const formData = new FormData()
    formData.append("image", photoFile)
    return axios.post('user/photo',  formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
export default userApi
