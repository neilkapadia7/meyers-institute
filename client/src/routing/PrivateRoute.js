import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
	auth: { isAuthenticated, loading },
	admin: { admin_isAuthenticated, admin_loading },
	component: Component,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={
				(props) =>
					!isAuthenticated && !loading ? (
						<Redirect to='/login' />
					) : (
						<Component {...props} />
					)

				// {
				// if (!isAuthenticated && !loading) {
				// 		return <Redirect to='/login' />;
				// 	} else if (admin_isAuthenticated) {
				// 		return <Redirect to='/admin/home' />;
				// 	} else {
				// 		return <Component {...props} />;
				// 	}
				// }
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	admin: state.admin,
});

export default connect(mapStateToProps, {})(PrivateRoute);
