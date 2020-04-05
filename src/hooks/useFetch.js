import {useEffect, useState} from 'react'
import axios from "axios";

export default url => {
	const baseUrl = 'https://conduit.productionready.io/api'
	const [isLoading, setIsLoading] = useState(false)
	const [response, setResponse] = useState(null)
	const [error, setError] = useState(null)
	const [options, setOptions] = useState({})

	const doFetch = (options = {}) => {
		setOptions(options)
		setIsLoading(true)
	}

	useEffect(() => {
		if (!isLoading) return
		axios(baseUrl + url, options)
			.then(res => {
				setIsLoading(false)
				setResponse(res.data)
			}).catch(error => {
				setIsLoading(false)
				setError(error.response.data)
		})
	},[isLoading])

	return [{isLoading, response, error}, doFetch]
}

