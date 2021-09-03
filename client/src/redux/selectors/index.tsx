import { StateType } from 'redux/reducer';

const getAuth = (state: StateType) => state.user.isAuth;
const getAuthLoading = (state: StateType) => state.user.isLoading;

// export const primitiveSelector = (state: object, resultKey: string, initialValue?: any) =>
//   getEntities(state)[resultKey] ?? initialValue;

const getAvatar = (state: StateType) => state.user.data?.avatar;
const getUserName = (state: StateType) => state.user.data?.fullname;

const getAudioId = (state: StateType) => state.audio.id;
const getPlay = (state: StateType) => state.audio.isPlay;
const getAudioSrc = (state: StateType) => state.audio.item;

const getComments = (state: StateType) => state.comments.items;
const getCommentsShow = (state: StateType) => state.comments.isShow;
const getCommentsLoader = (state: StateType) => state.comments.isLoader;
const getCommentsCount = (state: StateType) => state.comments.items.length;

const getBooks = (state: StateType) => state.books.items;
const getBooksParams = (state: StateType) => state.books.params;
const getBooksIsLoader = (state: StateType) => state.books.isLoader;

// screen
const getScreenWidth = (state: StateType) => state.settings.width;
const getScreenHeight = (state: StateType) => state.settings.height;

// const getLanguage = (state: StateType) => state.settings.

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
  getBooksParams,
  getUserName,
  getCommentsCount,
  getBooksIsLoader,
  getScreenWidth,
  getScreenHeight,
};
