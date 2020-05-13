const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Admin = require('../models/Admin');

router.post(
	'/',
	[
		check('name', 'Please Enter your Name').not().isEmpty(),
		check('email', 'Please Enter a valid Email ID').isEmail(),
		check(
			'password',
			'Please Enter A Password with 6 or More Character'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let admin = await Admin.findOne({ email });

			if (admin) {
				return res.status(400).json({ msg: 'Admin User Already Exists!' });
			}

			admin = new Admin({
				name,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			admin.password = await bcrypt.hash(password, salt);

			await admin.save();

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
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
