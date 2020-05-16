import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register, loadUser } from '../../Actions/authActions';
import Navbar from '../Admin/Layout/Navbar';

const Register = (props) => {
	const {
		auth: { isAuthenticated, error },
		register,
		loadUser,
	} = props;

	useEffect(() => {
		if (localStorage.token) {
			loadUser();
		}

		if (isAuthenticated) {
			props.history.push('/home');
		}

		if (error) {
			console.log(error);
		}
	}, [localStorage, loadUser, isAuthenticated, error]);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cpassword, setCpassword] = useState('');

	const submit = (e) => {
		e.preventDefault();

		if (password !== cpassword) {
			console.log("Passowrd Doesn't Match");
		} else {
			register({
				name,
				email,
				password,
			});
		}
	};

	return (
		<Fragment>
			<Navbar />

			<div id='home-sec1'>
				<div className='App-Auth'>
					<form onSubmit={submit} className='auth-form'>
						<h2>Create Account</h2>
						<div className='auth-input-div'>
							<label className='auth-label'>Name</label>
							<input
								type='text'
								placeholder='Enter Your Name'
								onChange={(e) => setName(e.target.value)}
								required
								className='auth-input'
							/>
						</div>
						<div className='auth-input-div'>
							<label className='auth-label'>Email ID</label>
							<input
								type='email'
								placeholder='Enter Your Email ID'
								onChange={(e) => setEmail(e.target.value)}
								required
								className='auth-input'
							/>
						</div>
						<div className='auth-input-div'>
							<label className='auth-label'>Password</label>
							<input
								type='password'
								placeholder='Enter Password'
								onChange={(e) => setPassword(e.target.value)}
								required
								className='auth-input'
							/>
						</div>
						<div className='auth-input-div'>
							<label className='auth-label'>Confirm Password</label>
							<input
								type='password'
								placeholder='Confirm Password'
								onChange={(e) => setCpassword(e.target.value)}
								required
								className='auth-input'
							/>
							<input type='submit' value='Register' className='auth-button' />
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

Register.propTypes = {
	register: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { register, loadUser })(Register);
