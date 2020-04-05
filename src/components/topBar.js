import React from "react"
import {Link, NavLink} from "react-router-dom"

const TopBar = () => {
	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to={'/'} className="navbar-brand">MEDIUM</Link>
				<ul className="navbar-nav pull-xs-right flex-row">
					<li className="nav-item mr-2">
						<NavLink to={'/'} className="nav-link" exact>Home</NavLink>
					</li>
					<li className="nav-item mr-2 ml-2">
						<NavLink to={'/login'} className="nav-link">Sign in</NavLink>
					</li>
					<li className="nav-item ml-2">
						<NavLink to={'/register'} className="nav-link">Sign up</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default TopBar