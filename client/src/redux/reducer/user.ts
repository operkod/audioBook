import produce from 'immer';
import { getToken } from 'helpers/token';
import { ActionsTypes } from 'redux/action/user';

type initialStateType = typeof initialState;
const initialUser = { id: '', avatar: '', fullname: '' };
export type ProfileTypes = {
  id: string;
  avatar: string;
  fullname: string;
};
const initialState = {
  isAuth: !!getToken(),
  data: initialUser as ProfileTypes,
  isLoading: false,
};

const userReducer = (state = initialState, action: ActionsTypes): initialStateType =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'USER@IS_AUTH':
        draft.isAuth = action.payload;
        break;
      case 'USER@SET_DATA':
        draft.data = action.payload;
        break;
      case 'USER@LOG_OUT':
        draft.data = initialUser;
        break;
      case 'USER@LOADER':
        draft.isLoading = action.payload;
        break;
      default:
    }
  });

export { userReducer };
