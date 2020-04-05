import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import axios from "axios"

import useFetch from "../../hooks/useFetch"

const Authentication = props => {
	const isLogin = props.location.pathname === '/login'
	const pageTitle = isLogin ? 'Sign in' : 'Sign up'
	const descriptionLink = isLogin ? '/registe' : '/login'
	const descriptionText = isLogin ? 'Need an Account?' : 'Have an account'
	const apiUrl = isLogin ? '/users/login?' : '/users'
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

	const handleSubmit = event => {
		event.preventDefault()
		const user = isLogin ? {email, password} : {email, password, username}
		doFetch({
			method: 'POST',
			data: {user}
		})
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

							<div className="spinner-border text-primary" role="status"></div>
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