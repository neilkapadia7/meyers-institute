import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './component/Auth/Login';
import Register from './component/Auth/Register';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path='/' component={Login} />
					<Route exact path='/register' component={Register} />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
