import produce from 'immer';
import { ActionsTypes } from 'redux/action/audioPlayer';

type InitialStateType = typeof initialState;

const initialState = {
  id: '',
  item: '',
  isPlay: false,
};

const audioReducer = (state = initialState, action: ActionsTypes): InitialStateType =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'AUDIO@SET_ID':
        draft.id = action.payload;
        break;
      case 'AUDIO@SET_ITEM':
        draft.item = action.payload;
        break;
      case 'AUDIO@IS_PLAY':
        draft.isPlay = action.payload;
        break;
      default:
    }
  });

export { audioReducer };
