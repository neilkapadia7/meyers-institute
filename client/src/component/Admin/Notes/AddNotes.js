import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { addNotes } from '../../../Actions/adminActions';
import { connect } from 'react-redux';

const AddNotes = ({ addNotes }) => {
	const [file, setFile] = useState();
	const [uploadedFile, setUploadedFile] = useState(null);
	const [title, setTitle] = useState('');

	const onChange = (e) => {
		setFile(e.target.files[0]);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (uploadedFile == null) {
			console.log('No File Uploaded');
		} else if (title === '') {
			console.log('No title');
		} else {
			addNotes({
				path: uploadedFile.filePath,
				title,
			});

			console.log('Successful');
			setUploadedFile(null);
			setTitle('');
		}
	};

	const fileUploadHandler = async (e) => {
		e.preventDefault();

		if (file === '') {
			console.log('No File Uploaded');
		} else {
			const fd = new FormData();
			fd.append('file', file);

			try {
				const res = await axios.post('/api/admin/upload', fd, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
					onUploadProgress: (progressEvent) => {
						console.log(
							'Upload Progress: ' +
								Math.round((progressEvent.loaded / progressEvent.total) * 100) +
								'%'
						);
					},
				});

				setFile('');

				const { fileName, filePath } = res.data;

				setUploadedFile({ fileName, filePath });
			} catch (err) {
				if (err.response.status === 500) {
					console.log('There was a problem with the server');
				} else {
					console.log(err);
					console.log('Server Error');
				}
			}
		}
	};

	return (
		<div>
			<h2>Add Notes</h2>
			{uploadedFile === null ? (
				<div>
					<input type='file' onChange={onChange} accept='.pdf' />
					<button onClick={fileUploadHandler}>Upload PDF</button>
				</div>
			) : (
				<div>
					<a href={uploadedFile.filePath} download='true'>
						File Uploaded SuccessFully!
					</a>
				</div>
			)}

			<form onSubmit={onSubmit}>
				<input
					type='title'
					placeholder='Enter Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<input type='submit' value='submit' />
			</form>
		</div>
	);
};

AddNotes.propTypes = {
	addNotes: PropTypes.func.isRequired,
};

export default connect(null, { addNotes })(AddNotes);
