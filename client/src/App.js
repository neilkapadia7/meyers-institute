import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App2 from './App2';

import AdminLogin from './component/Admin/Login';
import AdminHome from './component/Admin/Home';

import AdminRoute from './routing/AdminRoute';

import setAuthToken from './utils/setAuthToken';

const App = () => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path='/admin' component={AdminLogin} />
					<AdminRoute exact path='/admin/home' component={AdminHome} />
					<App2 />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
