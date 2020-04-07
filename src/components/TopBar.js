import React, {useContext, Fragment} from "react"
import {Link, NavLink} from "react-router-dom"
import {CurrentUserContext} from "../context/curentUser/currentUserContext"

const TopBar = () => {
	const [currentUserState] = useContext(CurrentUserContext)
	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to={'/'} className="navbar-brand">MEDIUM</Link>
				<ul className="navbar-nav pull-xs-right flex-row">
					<li className="nav-item mr-2">
						<NavLink to={'/'} className="nav-link" exact>Home</NavLink>
					</li>
					{
						!currentUserState.isLoggedIn && (
							<Fragment>
								<li className="nav-item mr-2 ml-2">
									<NavLink to={'/login'} className="nav-link">Sign in</NavLink>
								</li>
								<li className="nav-item ml-2">
									<NavLink to={'/register'} className="nav-link">Sign up</NavLink>
								</li>
							</Fragment>
						)
					}
					{
						currentUserState.isLoggedIn && (
							<Fragment>
								<li className="nav-item mr-2 ml-2">
									<NavLink to={'/articles/new'} className="nav-link">
										<i className="ion-compose"></i>
										New post
									</NavLink>
								</li>
								<li className="nav-item mr-2 ml-2">
									<NavLink to={`/profiles/${currentUserState.currentUser.username}`} className="nav-link">
										{
											currentUserState.currentUser.image && (
												<img
													src=""
													className="rounded"
													style={{
														maxWidth: 100
													}}
													alt=""/>
											)
										}
										{currentUserState.currentUser.username}
									</NavLink>
								</li>
							</Fragment>
						)
					}
				</ul>
			</div>
		</nav>
	)
}

export default TopBar