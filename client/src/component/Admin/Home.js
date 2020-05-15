import React, { Fragment } from 'react';
import Navbar from './Layout/Navbar';

const Home = () => {
	return (
		<Fragment>
			<Navbar />
			<div id='home-sec1'>
				<div className='App'>
					<h1>Admin Home</h1>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
