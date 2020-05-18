import React, { Fragment } from 'react';
import PrivateRoute from './routing/PrivateRoute';
import Login from './component/Auth/Login';
import GuestHome from './component/Guest Page/Home';
import About from './component/Guest Page/About';
import Navbar from './component/Layouts/Navbar';
import Contact from './component/Guest Page/Contact';
import { Route } from 'react-router-dom';
import './App.css';

import AuthHome from './component/Pages/Home';

const App2 = () => {
	return (
		<Fragment>
			<Navbar />
			<PrivateRoute exact path='/home' component={AuthHome} />
			<Route exact path='/' component={GuestHome} />
			<Route exact path='/about' component={About} />
			<Route exact path='/contact' component={Contact} />
			<Route exact path='/login' component={Login} />
		</Fragment>
	);
};

export default App2;
