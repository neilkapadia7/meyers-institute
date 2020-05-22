import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const GetNotes = ({ notes }) => {
	function evalNotes() {
		if (notes && notes.length === 0) {
			return <h3 className='student-name'>No Notes Uploaded</h3>;
		}
	}

	return (
		<div>
			<h2 className='title-size2'>Get Notes</h2>
			<div className='student-main-div'>
				{evalNotes()}
				{notes !== null
					? notes.map((note) => (
							<div className='student-item' key={note._id}>
								<h3 className='student-name'>{note.title}</h3>
								<a href={note.path} download>
									Download
								</a>
								<Moment format='D M YYYY'>{note.date}</Moment>
							</div>
					  ))
					: null}
			</div>
		</div>
	);
};

GetNotes.propTypes = {
	notes: PropTypes.array,
};

export default GetNotes;
