import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import HomePage from '../components/HomePage';
// import NotFoundPage from '../components/NotFoundPage';


//Routes
const AppRouter = () => (
	<BrowserRouter>
		<div>
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
		</div>
	</BrowserRouter>
)

export default AppRouter;