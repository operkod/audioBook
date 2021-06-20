import { getLanguage } from "helpers/token"
import produce from "immer"

// 'en', 'ru'
export const app = (state = { language: getLanguage() || 'ru' }, { type, payload }: any) => {
  return produce(state, draft => {
    switch (type) {
      case "APP@SET_LANGUAGE":
        draft.language = payload
        break
      default:
    }
  })
}
