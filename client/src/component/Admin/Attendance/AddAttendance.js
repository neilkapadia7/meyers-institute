import React from 'react';
import PropTypes from 'prop-types';

const AddAttendance = ({ students }) => {
	function evalStud() {
		if (students && students.length === 0) {
			return <h3 className='student-name'>No Students</h3>;
		}
	}

	return (
		<div>
			<h1>Add Attendance</h1>
			{evalStud()}
			{students !== null ? (
				students.map((student) => (
					<div key={student._id}>
						<h2>{student.name}</h2>
						<p>{student.email}</p>
					</div>
				))
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

AddAttendance.propTypes = {};

export default AddAttendance;
