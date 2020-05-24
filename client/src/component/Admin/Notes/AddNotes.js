import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { addNotes } from '../../../Actions/adminActions';
import { connect } from 'react-redux';

const AddNotes = ({ addNotes }) => {
	const [file, setFile] = useState('');
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
		<div className='add-notes-div'>
			<h2 className='title-size2'>Add Notes</h2>
			{uploadedFile === null ? (
				<div className='file-upload-div'>
					<input
						type='file'
						onChange={onChange}
						accept='.pdf'
						className='fileupload'
					/>
					<button onClick={fileUploadHandler} className='fileupload-button'>
						Upload PDF
					</button>
				</div>
			) : (
				<div className='file-upload-div'>
					<a
						href={uploadedFile.filePath}
						download='true'
						className='fileupload-download'>
						File Uploaded SuccessFully!
					</a>
				</div>
			)}

			<form onSubmit={onSubmit} className='notes-form'>
				<div className='notes-input-div'>
					<label className='notes-label'>Name</label>
					<input
						type='title'
						placeholder='Enter Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className='notes-input'
					/>
				</div>
				<input type='submit' value='Submit' className='notes-button' />
			</form>
		</div>
	);
};

AddNotes.propTypes = {
	addNotes: PropTypes.func.isRequired,
};

export default connect(null, { addNotes })(AddNotes);
