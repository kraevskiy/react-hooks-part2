import {useEffect, useState} from "react"

export default (key, initialValue = '') => {
	const [value, setValue] = useState(() => {
		return localStorage.getItem(key) || initialValue
	})

	useEffect(() => {
		localStorage.setItem(key, value)
	}, [value, key])

	return [value, setValue]
}