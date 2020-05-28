const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const adminMiddleware = require('../middleware/admin');
const Guest = require('../models/Guest');

// @route   GET    api/guest
// @desc    Get All Form Submission
// @access  Private
router.get('/', adminMiddleware, async (req, res) => {
	try {
		const guest = await Guest.find().sort({ date: -1 });

		res.json(guest);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST    api/guest
// @desc    Post Guest Form Submission
// @access  Public
router.post(
	'/',
	[
		check('name', 'Please Include a Name').not().isEmpty(),
		check('email', 'Please Include a valid Email ID').isEmail,
		check('phone', 'Please Include your Phone Number').not().isEmpty(),
		check('message', 'Please Add a Message').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone, message } = req.body;

		try {
			let guest = new Guest({
				name,
				phone,
				email,
				message,
			});

			await guest.save();

			res.json(guest);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
		}
	}
);

module.exports = router;
