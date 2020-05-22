import React from 'react';
import PropTypes from 'prop-types';

const GetAttendance = ({ attendance }) => {
	function evalAttendance() {
		if (attendance && attendance.length === 0) {
			return <h3 className='student-name'>No Students</h3>;
		}
	}

	return (
		<div>
			<h2>Check Attendance</h2>
			{evalAttendance()}
			{attendance !== null ? <p>There is Attendance</p> : <p>Loading...</p>}
			<div></div>
		</div>
	);
};

GetAttendance.propTypes = {
	attendance: PropTypes.object,
};

export default GetAttendance;
