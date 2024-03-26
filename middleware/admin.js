const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	const token = req.header('x-admin-token');

	if (!token) {
		return res.status(402).json({ message: 'No Token, Authorization Denied' });
	}
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user;
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Token is not Valid' });
	}
};
