const mongoose = require('mongoose');

const Vouchers = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    }, // Added by which user 
    limit: {type: Number, default: 1},
    isActive: {type: Boolean, default: true},
    expiryDate: {type: Date}
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

module.exports = mongoose.model('Vouchers', Vouchers);
