import React, { Fragment } from 'react';
import PrivateRoute from './routing/PrivateRoute';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import GuestHome from './component/Guest Page/Home';
import About from './component/Guest Page/About';
import Navbar from './component/Layouts/Navbar';
import { Route } from 'react-router-dom';

import AuthHome from './component/Pages/Home';

const App2 = () => {
	return (
		<Fragment>
			<Navbar />
			<PrivateRoute exact path='/home' component={AuthHome} />
			<Route exact path='/' component={GuestHome} />
			<Route exact path='/about' component={About} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/register' component={Register} />
		</Fragment>
	);
};

export default App2;
