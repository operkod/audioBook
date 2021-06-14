const base: string = '/'
const profile: string = '/profile'
const signin: string = '/signin'
const signup: string = '/signup'
const addBook: string = '/add'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getBase: () => base,
  getProfile: () => profile,
  getSignin: () => signin,
  getSignup: () => signup,
  getAddBook: () => addBook,
}