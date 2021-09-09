import { SET_MODAL } from 'actions';

type initialStateType = typeof initialState;
const initialState = {
  show: false,
  loader: false,
};

const modalReducer = (state = initialState, action: { type: string; payload: object }): initialStateType => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
