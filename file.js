const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const admin = require('./middleware/admin');

// Post File to DataBase
// /api/admin/upload
router.post(
	'/',
	[
		admin,
		[
			check('path', 'Path is Required').not().isEmpty(),
			check('user', 'User is Required').not().isEmpty(),
		],
	],
	async (req, res) => {
		if (req.files === null) {
			return res.status(400).json({ message: 'No File Uploaded' });
		}

		var file = req.files.file;

		file.name = Math.random() + '.pdf';

		console.log(file.mimetype);

		file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
			if (err) {
				console.error(err);
				return res.status(500).send(err);
			}

			res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
		});
	}
);

module.exports = router;
