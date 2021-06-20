export type BookType = {
  _id: string
  author: string
  comments: Array<string>
  description: string
  imgUrl: string
  name: string
}
export type CommentsType = {
  _id: string
  author: string
  text: string
}


export type LoginFormType = {
  email: string
  password: string
}

export type RegistrationFormType = {
  email: string
  fullname: string
  password: string
  password_2: string
}

export type AddBookType = {
  name: string,
  author: string,
  description: string,
}

export type FormDataErrorType = {
  [key: string]: { status: boolean, text: string }
}