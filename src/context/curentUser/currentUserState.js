import React, {useState} from "react"
import {} from '../types'
import {CurrentUserContext} from './currentUserContext'

export const CurrentUserState = ({children}) => {
	const initialState = {
		isLoading: false,
		isLoggedIn: null,
		currentUser: null
	}
	const [state, setState] = useState(initialState)
	return(
		<CurrentUserContext.Provider
			value={[
				state, setState
			]}
		>
			{children}
		</CurrentUserContext.Provider>
	)
}