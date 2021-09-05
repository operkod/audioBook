import produce from 'immer';

type InitialStateType = typeof initialState;

const initialState = {
  id: '',
  item: '',
  isPlay: false,
};

export default (state = initialState, action: any): InitialStateType =>
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
