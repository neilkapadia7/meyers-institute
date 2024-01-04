const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Admin = require('../models/Admin');
const adminMiddleware = require('../middleware/admin');



router.use('/admin', require('@routes/admin'));
router.use('/admin/auth', require('@routes/adminauth'));
router.use('/admin/attendance', require('@routes/attendance'));
router.use('/notes', require('@routes/notes'));
router.use('/users', require('@routes/users'));
router.use('/auth', require('@routes/auth'));
router.use('/guest', require('@routes/guest'));

module.exports = router;

