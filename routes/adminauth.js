const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Admin = require('../models/Admin');
const adminMiddleware = require('../middleware/admin');

// @route   GET    api/admin/auth
// @desc    Get Logged in user
// @access  Private
router.get('/', adminMiddleware, async (req, res) => {
	try {
		const admin = await Admin.findById(req.user.id).select('-password');
		res.json(admin);
	} catch (error) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST    api/admin/auth
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
			let admin = await Admin.findOne({ email });

			if (!admin) {
				return res.status(400).json({ message: 'Invalid Email Id' });
			}

			const isMatch = await bcrypt.compare(password, admin.password);

			if (!isMatch) {
				return res.status(400).json({ message: 'Invalid Password' });
			}

			const payload = {
				user: {
					id: admin.id,
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
			res.status(500).json({ message: 'Server Error' });
		}
	}
);

module.exports = router;
