const base = '/'
const profile = '/profile'
const signin = '/signin'
const signup = '/signup'
const addBook = '/add'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getBase: (): string => base,
	getProfile: (): string => profile,
	getSignin: (): string => signin,
	getSignup: (): string => signup,
	getAddBook: (): string => addBook
}
