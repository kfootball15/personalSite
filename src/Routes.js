import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
/** @TODO */
// import NotFoundPage from './components/NotFoundPage';

//Routes
export default function Routes ( props ) {
	return (
        <Router>
            {/* <Route component={ Navbar } /> */}
			<Switch>
				<Route
					path="/"
					component={ HomePage }
					exact={true}
				/>
			</Switch>
		</Router>
	)
}