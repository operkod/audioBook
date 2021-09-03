import produce from 'immer';
import { ActionsTypes } from 'redux/action/books';
import { BookType } from 'types';

export type InitialStateType = typeof initialState;

const initialState = {
  items: [] as Array<BookType>,
  params: {
    page: 0,
    search: '',
    totalPage: 0,
  },
  isLoader: false,
};

const booksReducer = (state = initialState, action: ActionsTypes): InitialStateType =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'BOOKS@SET_ITEMS':
        draft.items = action.payload;
        break;
      case 'BOOKS@IS_LOADER':
        draft.isLoader = action.payload;
        break;
      case 'BOOKS@PARAMS':
        draft.params = { ...state.params, ...action.payload };
        break;
      case 'BOOKS@ADD_COMMENT': {
        // eslint-disable-next-line no-underscore-dangle
        const index = draft.items.findIndex((el) => el._id === action.payload);
        draft.items[index].comments.push(action.payload);
        break;
      }
      case 'BOOKS@ADD_COMMENT_ERROR': {
        // eslint-disable-next-line no-underscore-dangle
        const index = draft.items.findIndex((el) => el._id === action.payload);
        draft.items[index].comments.pop();
        break;
      }
      case 'BOOKS@SET_LIKE': {
        const { bookId, status } = action.payload;
        // eslint-disable-next-line no-underscore-dangle
        const index = draft.items.findIndex((el) => el._id === bookId);
        const { count } = draft.items[index].likes;
        if (status) {
          draft.items[index].likes.count = count + 1;
        } else {
          draft.items[index].likes.count = count - 1;
        }
        draft.items[index].likes.status = status;
        break;
      }
      default:
    }
  });

export { booksReducer };
