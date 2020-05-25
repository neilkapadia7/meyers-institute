import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../Actions/authActions';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
	const Logout = () => {
		logout();
	};

	const authLinks = (
		<Fragment>
			<li>
				<Link to='/home'>Home</Link>
			</li>
			<li>
				<Link to='/about'>About</Link>
			</li>
			<li>
				<Link to='/cart'>Cart</Link>
			</li>
			<li>
				<a onClick={Logout}>Logout</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<a href='/#guest-home-sec1'>Home</a>
			</li>
			<li>
				<a href='/#guest-home-sec2'>About</a>
			</li>
			<li>
				<a href='/#guest-home-sec4'>Contact</a>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</Fragment>
	);

	return (
		<Fragment>
			<header>
				<div className='logo'>Logo</div>
				<nav>
					<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
				</nav>
			</header>
		</Fragment>
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
