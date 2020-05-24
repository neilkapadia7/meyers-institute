import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './design/guest.css';
import Image1 from './images/about1.jpg';
import Image2 from './images/about2.jpg';
import Image3 from './images/about3.jpg';

const Home = (props) => {
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
				<div className='guest-divider-content'></div>
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
				</div>
			</div>
		</Fragment>
	);
};

Home.propTypes = {};

export default Home;
