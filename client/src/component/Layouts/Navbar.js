import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../Actions/authActions';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = () => (
		<ul>
			<li>
				<Link to='/home'>Home</Link>
			</li>
			<li>
				<Link to='/about'>About</Link>
			</li>
			<li>
				<a onClick={Logout}>Logout</a>
			</li>
		</ul>
	);

	const guestLinks = () => (
		<ul>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/login'>Sign In</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
		</ul>
	);

	const Logout = () => {
		logout();
	};

	return (
		<header>
			<div className='logo'>Logo</div>
			<nav>{isAuthenticated ? authLinks : guestLinks}</nav>
		</header>
	);
};

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
