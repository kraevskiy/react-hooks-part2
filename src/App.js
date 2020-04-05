import React from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import Routes from './routes'
import TopBar from './components/topBar'

function App() {
	return (
		<Router>
			<TopBar />
			<Routes />
		</Router>
	);
}

export default App;
