const mongoose = require('mongoose');

const LiveClasses = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batches",
    },
    instrutorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    startDate: {type: Date},
    endDate: {type: Date},
    isDeleted: {type: Boolean, default: false}
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

module.exports = mongoose.model('LiveClasses', LiveClasses);
