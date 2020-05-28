const mongoose = require('mongoose');

const GuestSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		defaut: Date.now,
	},
});

module.exports = mongoose.model('guest', GuestSchema);
