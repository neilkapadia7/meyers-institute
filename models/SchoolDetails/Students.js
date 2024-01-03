const mongoose = require('mongoose');

// Incomplete
const Students = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
    batchHistory: [],
    currentBatch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batches",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }, // Added for which login 

}, 
{
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
);

module.exports = mongoose.model('Students', Students);
