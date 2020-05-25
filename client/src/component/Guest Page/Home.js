import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import './design/guest.css';
import Image1 from './images/about1.jpg';
import Image2 from './images/about2.jpg';
import Image3 from './images/about3.jpg';

const Home = (props) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [message, setMessage] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		console.log({
			name,
			email,
			phone,
			message,
		});

		setName('');
		setEmail('');
		setPhone('');
		setMessage('');
	};

	return (
		<Fragment>
			<div id='guest-home-sec1'>
				<div className='Guest-Outer-App'>
					<center>
						<div className='guest-sec1-div'>
							<p className='guest-small-title'>WE WORK HARD PLAY HARD</p>
							<h1 className='guest-title'>We are a Web Design Agency</h1>
							<a href='#guest-home-sec2' className='guest-button-white'>
								EXPLORE MORE
							</a>
						</div>
					</center>
				</div>
			</div>
			<div id='guest-home-sec2'>
				<div className='Guest-App'>
					<center>
						<h2 className='guest-small-title-2'>
							ABOUT MEYERS TEACHING INSTITUTE
						</h2>
						<p className='guest-description'>
							We always stay with our clients and respect their business. We
							deliver 100% and provide instant response to help them succeed in
							constantly changing and challenging business world.
						</p>
					</center>
					<div className='guest-about-div'>
						<div className='guest-about-item'>
							<div className='guest-about-top'>
								<img src={Image1} alt='Meyers Teaching Institute' />
							</div>
							<div className='guest-about-bottom'>
								<div className='guest-about-padding'>
									<p className='guest-about-heading'>
										Understand the situation
									</p>
									<p className='guest-about-para'>
										Lorem Ipsum is simply text of the printing and typesetting
										industry. Lorem Ipsum has been standard dummy.
									</p>
								</div>
							</div>
						</div>
						<div className='guest-about-item'>
							<div className='guest-about-top'>
								<img src={Image2} alt='Meyers Teaching Institute' />
							</div>
							<div className='guest-about-bottom'>
								<div className='guest-about-padding'>
									<p className='guest-about-heading'>
										Bring the experience to life
									</p>
									<p className='guest-about-para'>
										Lorem Ipsum is simply text of the printing and typesetting
										industry. Lorem Ipsum has been standard dummy.
									</p>
								</div>
							</div>
						</div>
						<div className='guest-about-item'>
							<div className='guest-about-top'>
								<img src={Image3} alt='Meyers Teaching Institute' />
							</div>
							<div className='guest-about-bottom'>
								<div className='guest-about-padding'>
									<p className='guest-about-heading'>
										Strategise chart the course
									</p>
									<p className='guest-about-para'>
										Lorem Ipsum is simply text of the printing and typesetting
										industry. Lorem Ipsum has been standard dummy.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='guest-divider'>
				<div className='guest-divider-content'>
					<p className='guest-divider-small-heading'>TESTIMONIAL</p>
					<p className='guest-divider-heading'>
						Beautiful and easy to use UI, professional animations and drag &amp;
						drop feature
					</p>
				</div>
			</div>
			<div id='guest-home-sec3'>
				<div className='Guest-App'>
					<center>
						<h2 className='guest-small-title-2'>WHAT WE DO</h2>
						<p className='guest-description'>OUR SERVICES</p>
					</center>
					<div className='guest-services-div'>
						<div className='guest-services-item'>
							<div className='guest-services-padding'>
								<i className='fas fa-book guest-services-icon'></i>
								<p className='guest-services-title'>Massive Element Library</p>
								<p className='guest-services-para'>
									Aenean massa. Cum sociis natoque penatibus et magnis dis
									aenean.
								</p>
							</div>
						</div>
						<div className='guest-services-item'>
							<div className='guest-services-padding'>
								<i className='fas fa-book guest-services-icon'></i>
								<p className='guest-services-title'>Great Documentation</p>
								<p className='guest-services-para'>
									Aenean massa. Cum sociis natoque penatibus et magnis dis
									aenean.
								</p>
							</div>
						</div>
						<div className='guest-services-item'>
							<div className='guest-services-padding'>
								<i className='fas fa-book guest-services-icon'></i>
								<p className='guest-services-title'>Killer Design Work</p>
								<p className='guest-services-para'>
									Aenean massa. Cum sociis natoque penatibus et magnis dis
									aenean.
								</p>
							</div>
						</div>
						<div className='guest-services-item'>
							<div className='guest-services-padding'>
								<i class='fas fa-book guest-services-icon'></i>
								<p className='guest-services-title'>Massive Element Library</p>
								<p className='guest-services-para'>
									Aenean massa. Cum sociis natoque penatibus et magnis dis
									aenean.
								</p>
							</div>
						</div>
						<div className='guest-services-item'>
							<div className='guest-services-padding'>
								<i class='fas fa-book guest-services-icon'></i>
								<p className='guest-services-title'>Great Documentation</p>
								<p className='guest-services-para'>
									Aenean massa. Cum sociis natoque penatibus et magnis dis
									aenean.
								</p>
							</div>
						</div>
						<div className='guest-services-item'>
							<div className='guest-services-padding'>
								<i class='fas fa-book guest-services-icon'></i>
								<p className='guest-services-title'>Killer Design Work</p>
								<p className='guest-services-para'>
									Aenean massa. Cum sociis natoque penatibus et magnis dis
									aenean.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id='guest-home-sec4'>
				<div className='Guest-App'>
					<center>
						<h2 className='guest-small-title-2'>CONTACT US</h2>
						<p className='guest-description'>
							Fill out the form &amp; we'll be in touch soon!
						</p>
					</center>
					<div className='Guest-contact-Main-App'>
						<div className='Guest-Contact-App'>
							<div className='guest-contact-left'>
								<div className='guest-contact-overlay'>
									<div className='guest-contact-details-main'>
										<div className='guest-contact-details'>
											<i className='fas fa-map-marker-alt guest-contact-icon'></i>
											<p className='guest-contact-details-heading'>Address</p>
											<p className='guest-contact-details-para'>
												Aenean massa. Cum sociis natoque penatibus et magnis dis
												aenean.
											</p>
										</div>
										<div className='guest-contact-details'>
											<i className='fas fa-mobile-alt guest-contact-icon'></i>
											<p className='guest-contact-details-heading'>
												Let's Talk
											</p>
											<p className='guest-contact-details-para'>
												+91 9999999999
											</p>
										</div>
										<div className='guest-contact-details'>
											<i className='far fa-envelope  guest-contact-icon'></i>
											<p className='guest-contact-details-heading'>Email Id</p>
											<p className='guest-contact-details-para'>
												emailid@gmail.com
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className='guest-contact-right'>
								<form onSubmit={onSubmit} className='guest-form'>
									<h2 className='guest-form-heading'>Send Us A Message</h2>
									<div className='guest-input-div'>
										<label className='guest-label'>Name</label>
										<input
											type='text'
											placeholder='Name'
											className='guest-input'
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
									<div className='guest-input-div'>
										<label className='guest-label'>Email</label>
										<input
											type='email'
											placeholder='Email ID'
											className='guest-input'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div className='guest-input-div'>
										<label className='guest-label'>Phone Number</label>
										<input
											type='tel'
											placeholder='Phone Number'
											className='guest-input'
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
										/>
									</div>
									<div className='guest-input-div'>
										<label className='guest-label'>Message</label>
										<textarea
											placeholder='Write your message.....'
											className='guest-textarea'
											value={message}
											onChange={(e) => setMessage(e.target.value)}
										/>
									</div>
									<input
										type='submit'
										value='Submit'
										className='guest-input-submit'
									/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='guest-footer'>
				<p className='guest-footer-content'>
					&copy; Meyers Teaching Institute. Developed and Maintained by{' '}
					<a href='https://www.neyatechdevelopers.com/'>NeyaTech Developers</a>
				</p>
			</div>
		</Fragment>
	);
};

Home.propTypes = {};

export default Home;
