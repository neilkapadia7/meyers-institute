import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import AttendanceItem from './AttendanceItem';

const AddAttendance = ({ student }) => {
	function evalStud() {
		if (student && student.length === 0) {
			return <h3 className='student-name'>No Students</h3>;
		}
	}

	return (
		<div>
			<h1>Add Attendance</h1>
			<Moment format='D MMMM Y'>{Date.now()}</Moment>
			{evalStud()}
			{student !== null ? (
				<div>
					{student.map((student) => (
						<AttendanceItem key={student._id} student={student} />
					))}
					{/* <button onClick={Add}>Submit</button> */}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

AddAttendance.propTypes = {};

export default AddAttendance;
