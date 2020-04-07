import React, {useReducer} from "react"
import {} from '../types'
import {CurrentUserContext} from './currentUserContext'
import {currentUserReducer} from "./currentUserReducer";

export const initialStateUser = {
	isLoading: false,
	isLoggedIn: null,
	currentUser: null
}

export const CurrentUserState = ({children}) => {
	const state = useReducer(currentUserReducer, initialStateUser)
	return(
		<CurrentUserContext.Provider
			value={state}
		>
			{children}
		</CurrentUserContext.Provider>
	)
}