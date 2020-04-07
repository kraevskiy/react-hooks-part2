import {useContext, useEffect} from 'react'
import useFetch from "../hooks/useFetch"
import useLocalStorage from "../hooks/useLocalStorage"
import {CurrentUserContext} from "../context/curentUser/currentUserContext"
import {LOADING, SET_AUTHORIZED, SET_UNAUTHORIZED} from "../context/types"

const CurrentUserChecked = ({children}) => {
	const [{response}, doFetch] = useFetch('/user')
	const [, dispatch] = useContext(CurrentUserContext)
	const [token] = useLocalStorage('token')

	useEffect(() => {
		if(!token){
			dispatch({
				type: SET_UNAUTHORIZED,
			})
			dispatch({
				type: LOADING,
			})
			return
		}
		doFetch()
		dispatch({
			type: LOADING,
		})
	}, [token, dispatch, doFetch])

	useEffect(() => {
		if(!response) return
		dispatch({
			type: SET_AUTHORIZED,
			payload: response.user
		})

	},[response, dispatch])

	return children
}

export default CurrentUserChecked