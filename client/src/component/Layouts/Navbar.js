import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../Actions/authActions';
import Icon from '../../statics/icon.jpeg';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
	const [isNabarActive, setIsNabarActive] = useState(false);
	const [isMeyers, setIsMeyers] = useState(false);
	const location = useLocation();

	useEffect(() => {
		console.log('location', location);
		if(location.pathname == "/meyers-institute") {
			setIsMeyers(true);
		}
	}, [location]);


	const toggleClass = () => {
		setIsNabarActive(!isNabarActive);
		const element = document.getElementById('ul');
		if (element) {
			element.classList.add('active-menu');
		}
	};
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
			<input class="menu-btn" type="checkbox" id="menu-btn"/>
			<label class="menu-icon" for="menu-btn" onClick={() => toggleClass()}><span class="navicon"></span></label>
			<ul class={`menu ${isNabarActive && 'active-menu'}`}>
				<li>
					<a href='/#guest-home-sec1'>Home</a>
				</li>
				<li>
					<a href='/#guest-home-sec2'>About</a>
				</li>
				<li>
					<a href='/#guest-home-sec4'>Contact</a>
				</li>
			</ul>
			{/* <li>
				<Link to='/login'>Login</Link>
			</li> */}
		</Fragment>
	);

	return (
		<Fragment>
			<header>
				<div className='logo'>
					{isMeyers ? <img src={Icon} /> : "Company Name" }
				</div>
				{/* <nav> */}
					{guestLinks}
					{/* <ul>{isAuthenticated ? authLinks : guestLinks}</ul> */}
				{/* </nav> */}
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
