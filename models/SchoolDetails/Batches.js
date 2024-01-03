const mongoose = require('mongoose');

const Batches = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }, // Added by which user 
    
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

module.exports = mongoose.model('Batches', Batches);
