import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';

/** @TODO */
// import NotFoundPage from '../components/NotFoundPage';


//Routes
export default function AppRouter ( props ) {
	return (
		<div>
			<Router>
				<Route render={Navbar} />
				<Switch>
					<Route 
						path="/"
						component={ HomePage }
						exact={true}
						/>
					{/* 
					Example routes:
					
					<Route
						path="/checkout"
						component={ CheckoutPage }
						/>
					<Route
						component={ NotFoundPage }
						/> 
					*/}
				</Switch>
			</Router>
		</div>
	)
}