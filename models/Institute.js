const mongoose = require('mongoose');

const Institutes = mongoose.Schema({
    image: {type: String},
	name: {
		type: String,
		required: true,
	},
	instructorList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }],
	adminId: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
	},
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

module.exports = mongoose.model('Institutes', Institutes);
