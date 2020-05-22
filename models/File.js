const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
	path: {
		type: String,
		required: true,
	},
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'admins',
	},
});

module.exports = mongoose.model('files', FileSchema);
