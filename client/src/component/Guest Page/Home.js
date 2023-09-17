import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import './design/guest.css';
import Image1 from './images/about1.jpg';
import Image2 from './images/about2.jpg';
import Image3 from './images/about3.jpg';
import { connect } from 'react-redux';
import { addQuery } from '../../Actions/guestActions';

const Home = ({ query, error, addQuery }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [message, setMessage] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		if (name === '' || email === '' || phone === '' || message === '') {
		} else {
			console.log({
				name,
				email,
				phone,
				message,
			});
			addQuery({
				name,
				email,
				phone,
				message,
			});

			setName('');
			setEmail('');
			setPhone('');
			setMessage('');
		}
	};

	return (
		<Fragment>
			<div id='guest-home-sec1'>
				<div className='Guest-Outer-App'>
					<center>
						<div className='guest-sec1-div'>
							<p className='guest-small-title'>WHERE SUCCESS BECOMES A WAY OF LIFE</p>
							<h1 className='guest-title'>Meyers Teaching Institute</h1>
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
							Empowering Minds, Inspiring Growth, Developing Civitas, Connecting Learners, Enabling Learning - Anytime, Anywhere -  Beyond Borders and Time, Virtually.
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
										The Beginning...
									</p>
									<p className='guest-about-para'>
										Founded in the 1970s by the visionary Mrs. Bernice Meyers, Meyers Teaching Institute began as a French Teaching Class. Her foresight laid the foundation for an institution dedicated to educational excellence. Over the years, the institute has evolved, upholding her commitment to quality education and inspiring generations of learners.
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
										Meyers Teaching Institute's Comprehensive Educational Evolution
									</p>
									<p className='guest-about-para'>
										Under the visionary guidance of Mr. Ian Meyers and Mrs. Raybelle Meyers, Meyers Teaching Institute has evolved into a comprehensive educational powerhouse. Their transformative leadership has enabled the institute to offer a holistic educational journey encompassing grades 1 to 10, aligned with the esteemed Maharashtra State Board Curriculum in India. With a relentless commitment to excellence, the institute has become a beacon of comprehensive education, nurturing students across all dimensions of learning. This dynamic approach ensures that learners receive a well-rounded education, preparing them not only for academic success but also for a fulfilling and impactful future.
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
										Online Education
									</p>
									<p className='guest-about-para'>
									Established after 2020, Meyers Teaching Institute evolved and was transformed Mr. Kyle Meyers and Ms. Neha Kapadia as pioneers to online education. With specialised training from esteemed institutions like UCL, the National Institute of Teaching in London, and the University of Birmingham, their expertise is exceptional. The institute is dedicated to delivering top-tier education, focusing on the IGCSE and IB curricula. Through their dynamic online platform, students benefit from their vast knowledge and innovative teaching methods. This visionary approach not only adapts to the changing educational landscape but also provides students with a well-rounded, globally relevant learning experience.
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
								<p className='guest-services-title'>Diversity, equity, and inclusion (DEI)</p>
								<p className='guest-services-para'>
								At Meyers Teaching Institute, DEI is integral to our online teaching. We promote inclusivity, diverse perspectives, accessible education, open dialogues, and global readiness in a rich learning environment.
								</p>
							</div>
						</div>
						<div className='guest-services-item'>
							<div className='guest-services-padding'>
								<i className='fas fa-book guest-services-icon'></i>
								<p className='guest-services-title'>Career Growth and Learning</p>
								<p className='guest-services-para'>
									Meyers Teaching Institute prioritizes career growth and continuous learning. Our dynamic online platform offers updated industry insights, global networking, expert guidance, and flexible scheduling for transformative online education.
								</p>
							</div>
						</div>
						<div className='guest-services-item'>
							<div className='guest-services-padding'>
								<i className='fas fa-book guest-services-icon'></i>
								<p className='guest-services-title'>Why choose to prepare for IGCSE and IB examinations with us?</p>
								<p className='guest-services-para'>
								Prepare for IGCSE and IB exams online at Meyers Teaching Institute. Our highly qualified team offers flexible schedules, interactive classes, and expert guidance, ensuring academic success worldwide.
								</p>
							</div>
						</div>
						{/* <div className='guest-services-item'>
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
						</div> */}
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
												Mahim, Mumbai - 400 016, Maharashtra
											</p>
										</div>
										<div className='guest-contact-details'>
											<i className='fas fa-mobile-alt guest-contact-icon'></i>
											<p className='guest-contact-details-heading'>
												Let's Talk
											</p>
											<p className='guest-contact-details-para'>
												<a href="tel:9769589102">9769589102</a> / <a href="tel:9920276851">9920276851</a>
											</p>
										</div>
										<div className='guest-contact-details'>
											<i className='far fa-envelope  guest-contact-icon'></i>
											<p className='guest-contact-details-heading'>Email Id</p>
											<p className='guest-contact-details-para'>
												<a href="mailto:meyersteaching.institute@gmail.com">meyersteaching.institute@gmail.com</a>
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
											required
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
											required
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
											required
											onChange={(e) => setPhone(e.target.value)}
										/>
									</div>
									<div className='guest-input-div'>
										<label className='guest-label'>Message</label>
										<textarea
											placeholder='Write your message.....'
											className='guest-textarea'
											value={message}
											required
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
					<a href='https://www.neyatechdevelopers.com/'>Neil Kapadia</a>
				</p>
			</div>
		</Fragment>
	);
};

Home.propTypes = {
	query: PropTypes.string,
	error: PropTypes.string,
	addQuery: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	query: state.guest.query,
	error: state.guest.error,
});

export default connect(mapStateToProps, { addQuery })(Home);
