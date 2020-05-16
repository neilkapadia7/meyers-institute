import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App2 from './App2';

import AdminLogin from './component/Admin/Login';
import AdminHome from './component/Admin/Home';
import CreateUser from './component/Admin/CreateUser';
import Attendance from './component/Admin/Attendance/Attendance';
import Notes from './component/Admin/Notes/Notes';
import Students from './component/Admin/Students/Students';

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
					<AdminRoute exact path='/register' component={CreateUser} />
					<AdminRoute exact path='/admin/attendance' component={Attendance} />
					<AdminRoute exact path='/admin/notes' component={Notes} />
					<AdminRoute exact path='/admin/students' component={Students} />
					<App2 />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
