import React from "react"
import {Switch, Route} from 'react-router-dom'
import GlobalFeed from "../pages/globalFeed"
import Article from "../pages/article"
import Authentication from "../pages/authentication"
import TagFeed from "../pages/tagFeed"

export default () => {
	return (
		<Switch>
			<Route path={'/'} component={GlobalFeed} exact />
			<Route path={'/tags/:slug'} component={TagFeed}  />
			<Route path={'/login'} component={Authentication} />
			<Route path={'/register'} component={Authentication} />
			<Route path={'/articles/:slug'} component={Article} />
		</Switch>
	)
}