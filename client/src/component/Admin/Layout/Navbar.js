import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../Actions/adminActions';

const Navbar = ({ admin: { admin_isAuthenticated }, logout }) => {
	const Logout = () => {
		logout();
	};

	const authLinks = (
		<Fragment>
			<li>
				<Link to='/admin/home'>Home</Link>
			</li>

			<li>
				<a onClick={Logout}>Logout</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/'>Back TO Main Site</Link>
			</li>
		</Fragment>
	);

	return (
		<Fragment>
			<header>
				<div className='logo'>Logo</div>
				<nav>
					<ul>{admin_isAuthenticated ? authLinks : guestLinks}</ul>
				</nav>
			</header>
		</Fragment>
	);
};

Navbar.propTypes = {
	admin: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	admin: state.admin,
});

export default connect(mapStateToProps, { logout })(Navbar);
