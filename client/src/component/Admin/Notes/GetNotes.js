import React from 'react';
import PropTypes from 'prop-types';
import NotesItem from './NotesItem';

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
					? notes.map((note) => <NotesItem notes={note} key={note._id} />)
					: null}
			</div>
		</div>
	);
};

GetNotes.propTypes = {
	notes: PropTypes.array,
};

export default GetNotes;
