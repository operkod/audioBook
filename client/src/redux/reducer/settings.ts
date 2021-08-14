type initialStateType = typeof initialState;
const initialState = {
  width: 0,
  height: 0,
};

const settingsReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case 'SETTINGS@SET_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export { settingsReducer };
