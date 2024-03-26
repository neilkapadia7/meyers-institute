const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();
const Notes = require('../models/Notes');
const admin = require('../middleware/admin');

// @route   POST    api/notes
// @desc    POST Notes to Database
// @access  Private
router.post(
	'/',
	[
		admin,
		[
			check('path', 'The Path is Required').not().isEmpty(),
			check('title', 'The Title is Required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { path, title } = req.body;

		try {
			let notes = new Notes({
				path,
				title,
			});

			await notes.save();

			res.json(notes);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ message: 'Server Error' });
		}
	}
);

// @route   GET    api/notes
// @desc    POST Notes to Database
// @access
router.get('/', async (req, res) => {
	try {
		const notes = await Notes.find().sort({ date: -1 });

		res.json(notes);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ message: 'Server Error' });
	}
});

// @route   DELETE    api/notes
// @desc    DELETE Notes from Database
// @access private
router.delete('/:id', admin, async (req, res) => {
	try {
		const notes = await Notes.findById(req.params.id);

		if (!notes) return res.status(404).json({ message: 'File Not Found' });

		await Notes.findByIdAndRemove(req.params.id);

		res.json({ message: 'File Delete' });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ message: 'Server Error' });
	}
});

module.exports = router;
