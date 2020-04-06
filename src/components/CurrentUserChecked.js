import {useContext, useEffect} from 'react'
import useFetch from "../hooks/useFetch"
import useLocalStorage from "../hooks/useLocalStorage"
import {CurrentUserContext} from "../context/curentUser/currentUserContext";

const CurrentUserChecked = ({children}) => {
	const [{response}, doFetch] = useFetch('/user')
	const [, setCurrentUserState] = useContext(CurrentUserContext)
	const [token] = useLocalStorage('token')

	useEffect(() => {
		if(!token){
			setCurrentUserState(state => ({
				...state,
				isLoggedIn: false
			}))
			return
		}
		doFetch()
		setCurrentUserState(state => ({
			...state,
			isLoading: true
		}))
	}, [token, setCurrentUserState, doFetch])

	useEffect(() => {
		if(!response) return
		setCurrentUserState(state => ({
			...state,
			isLoggedIn: true,
			isLoading: false,
			currentUser: response.user
		}))

	},[response, setCurrentUserState])

	return children
}

export default CurrentUserChecked