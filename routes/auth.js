const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET    api/auth
// @desc    Get Logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST    api/auth
// @desc   User LogIn
// @access   Public
router.post(
	'/',
	[
		check('email', 'Please Include a Valid Email Id').isEmail(),
		check('password', 'Please enter your password').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: 'Invalid Email Id' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Password' });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 3600,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ msg: 'Server Error' });
		}
	}
);

module.exports = router;
