import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import Home from './component/Pages/Home';
import About from './component/Pages/About';

import PrivateRoute from './routing/PrivateRoute';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<PrivateRoute exact path='/' component={Home} />
					<PrivateRoute exact path='/about' component={About} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
