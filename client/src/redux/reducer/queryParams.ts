import { SET_PARAMS_QUERY_BOOKS } from 'Actions';

type initialStateType = typeof initialState;
const initialState = {
  page: 0,
  search: '',
};

const queryParams = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SET_PARAMS_QUERY_BOOKS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default queryParams;
