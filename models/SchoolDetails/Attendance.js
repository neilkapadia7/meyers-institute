const mongoose = require('mongoose');

const AttendanceSchema = mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batches",
    },
	liveClassId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LiveClasses",
    },
	students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
		attended: {
			type: Boolean,
			default: false
		}
    }],

});

module.exports = mongoose.model('Attendances', AttendanceSchema);
