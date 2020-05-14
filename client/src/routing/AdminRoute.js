import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
	admin: { admin_isAuthenticated, admin_loading },
	component: Component,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				!admin_isAuthenticated && !admin_loading ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	admin: state.admin,
});

export default connect(mapStateToProps, {})(PrivateRoute);
