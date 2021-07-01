import { StateType } from 'redux/reducer'

const getAuth = (state: StateType) => state.user.isAuth
const getAuthLoading = (state: StateType) => state.user.isLoading

const getAvatar = (state: StateType) => state.user.data?.avatar
const getUserName = (state: StateType) => state.user.data?.fullname

const getAudioId = (state: StateType) => state.audio.id
const getPlay = (state: StateType) => state.audio.isPlay
const getAudioSrc = (state: StateType) => state.audio.item

const getComments = (state: StateType) => state.comments.items
const getCommentsShow = (state: StateType) => state.comments.isShow
const getCommentsLoader = (state: StateType) => state.comments.isLoader
const getCommentsCount = (state: StateType) => state.comments.items.length

const getBooks = (state: StateType) => state.books.items
const getTotalBooks = (state: StateType) => state.books.total
const getBooksPage = (state: StateType) => state.books.page
const getSearchValue = (state: StateType) => state.books.searchValue
const getBooksIsLoader = (state: StateType) => state.books.isLoader

const getLanguage = (state: StateType) => state.app.language

export {
	getAuth,
	getAuthLoading,
	getAudioId,
	getPlay,
	getAudioSrc,
	getAvatar,
	getComments,
	getCommentsShow,
	getCommentsLoader,
	getBooks,
	getTotalBooks,
	getSearchValue,
	getUserName,
	getCommentsCount,
	getLanguage,
	getBooksIsLoader,
	getBooksPage
}
