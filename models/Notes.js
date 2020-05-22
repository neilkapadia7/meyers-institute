const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
	path: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('notes', NotesSchema);
