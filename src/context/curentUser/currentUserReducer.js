import {LOADING, LOGOUT, SET_AUTHORIZED, SET_UNAUTHORIZED} from "../types"
import {initialStateUser} from "./currentUserState"

const handlers = {
  [LOADING]: (state) => ({...state, isLoading: true}),
  [SET_AUTHORIZED]: (state, {payload}) => ({...state, isLoading: false, isLoggedIn: true, currentUser: payload}),
  [SET_UNAUTHORIZED]: (state) => ({...state, isLoggedIn: false}),
  [LOGOUT]: () => ({...initialStateUser, isLoggedIn: false}),
  DEFAULT: state => state
}

export const currentUserReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}