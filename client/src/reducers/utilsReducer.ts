import { UPDATE_UTILS } from 'actions';

export default (state = {}, action: { type: string; payload: object }) => {
  if (action.type === UPDATE_UTILS) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
};
