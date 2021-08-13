/*eslint-disable */
type initialStateType = typeof initialState
const initialState = {
  width: 1200,
  height: 500

}

const settingsReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case "SETTINGS_SET_DATA":
      return { ...state, ...action.payload }
    default: return state
  }
}

export { settingsReducer }