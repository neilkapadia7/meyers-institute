import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const AddAttendance = ({ students }) => {
	const [attendance, setAttendance] = useState({
		date: Date.now(),
		students: [],
	});

	function evalStud() {
		if (students && students.length === 0) {
			return <h3 className='student-name'>No Students</h3>;
		}
	}

	const Add = () => {
		console.log('Attendance Submitted');
	};

	return (
		<div>
			<h1>Add Attendance</h1>
			<Moment format='D MMMM Y'>{Date.now()}</Moment>
			{evalStud()}
			{students !== null ? (
				<div>
					{students.map((student) => (
						<div key={student._id}>
							<h2>{student.name}</h2>
							Present <input type='radio' value='Present' />
							Absent <input type='radio' value='Absent' />
						</div>
					))}
					<button onClick={Add}>Submit</button>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

AddAttendance.propTypes = {};

export default AddAttendance;
