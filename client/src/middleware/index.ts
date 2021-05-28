import { StateType } from "redux/reducer"
import { ActionsTypes as ActionUser } from "redux/action/user"
import { Dispatch } from "react"

export const authStorage = (store: StateType) => (next: Dispatch<ActionUser>) => (action: ActionUser) => {
  if (action.type === "USER@SET_DATA") {
    const { token, user } = action.payload
    window.axios.defaults.headers.authorization = `Bearer ${token}`
    window.localStorage.setItem("token", token)
    window.localStorage.setItem("user", JSON.stringify(user))
  }
  return next(action)
}

