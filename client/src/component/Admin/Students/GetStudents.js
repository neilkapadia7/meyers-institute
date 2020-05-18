import React from 'react';
import PropTypes from 'prop-types';

const GetStudents = ({ students }) => {
	function evalStud() {
		if (students && students.length === 0) {
			return <h3 className='student-name'>No Students</h3>;
		}
	}

	return (
		<div>
			<h2 className='title-size2'>Students</h2>
			<div className='student-main-div'>
				{evalStud()}
				{students !== null ? (
					students.map((student) => (
						<div key={student._id} className='student-item'>
							<h3 className='student-name'>{student.name}</h3>
							<p className='student-email'>{student.email}</p>
						</div>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
};

GetStudents.propTypes = {
	students: PropTypes.array,
};

export default GetStudents;
