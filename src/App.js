import React from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import Routes from './routes'
import TopBar from './components/TopBar'
import {CurrentUserState} from "./context/curentUser/currentUserState"
import CurrentUserChecked from "./components/CurrentUserChecked"

function App() {
	return (
		<CurrentUserState>
			<CurrentUserChecked>
				<Router>
					<TopBar/>
					<Routes/>
				</Router>
			</CurrentUserChecked>
		</CurrentUserState>
	);
}

export default App;
