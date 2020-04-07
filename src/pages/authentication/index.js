import React, {useState, useEffect, useContext} from 'react'
import {Link, Redirect} from "react-router-dom"

import useLocalStorage from '../../hooks/useLocalStorage'
import useFetch from "../../hooks/useFetch"
import {CurrentUserContext} from "../../context/curentUser/currentUserContext"
import BackendErrorMessages from "../../components/BackendErrorMessages"
import {SET_AUTHORIZED} from "../../context/types"

const Authentication = props => {
	const isLogin = props.location.pathname === '/login'
	const pageTitle = isLogin ? 'Sign in' : 'Sign up'
	const descriptionLink = isLogin ? '/register' : '/login'
	const descriptionText = isLogin ? 'Need an Account?' : 'Have an account'
	const apiUrl = isLogin ? '/users/login?' : '/users'
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)
	const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
	const [, setToken] = useLocalStorage('token')
	const [, dispatch] = useContext(CurrentUserContext)


	const handleSubmit = event => {
		event.preventDefault()
		const user = isLogin ? {email, password} : {email, password, username}
		doFetch({
			method: 'POST',
			data: {user}
		})
	}

	useEffect(() => {
		if (!response) return
		setToken(response.user.token)
		setIsSuccessfulSubmit(true)
		dispatch({
			type: SET_AUTHORIZED,
			payload: response.user
		})
	}, [response, setToken, dispatch])

	if (isSuccessfulSubmit) {
		return <Redirect to='/'/>
	}

	return (
		<div className="auth-page">
			<div className="container page">
				<div className="row">
					<div className="col-md-6 m-auto">
						<h1 className="text-center">{pageTitle}</h1>
						<p className="text-center">
							<Link className="btn btn-link text-success" to={descriptionLink}>{descriptionText}</Link>
						</p>
						{error && <BackendErrorMessages backendErrors={error.errors}/>}
						<form onSubmit={handleSubmit}>
							<fieldset>
								{
									!isLogin && (
										<fieldset className="form-group">
											<input
												type="text"
												className="form-control form-control-lg"
												value={username}
												onChange={e => setUsername(e.target.value)}
												placeholder="Username"/>
										</fieldset>
									)
								}
								<fieldset className="form-group">
									<input
										type="email"
										className="form-control form-control-lg"
										value={email}
										onChange={e => setEmail(e.target.value)}
										placeholder="email"/>
								</fieldset>
								<fieldset className="form-group">
									<input
										type="password"
										className="form-control form-control-lg"
										value={password}
										onChange={e => setPassword(e.target.value)}
										placeholder="password"/>
								</fieldset>
							</fieldset>

							<button
								className="d-flex ml-auto btn btn-lg pull-left btn-success"
								type="submit"
								disabled={isLoading}
							>{pageTitle}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Authentication