const mongoose = require('mongoose');

const Packages = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    keyFeatures: [{
        title: {type: String},
        subFeatures: [
            {
                title: {type: String},
                sequence: {type: Number},
            }
        ]
    }], 
    limit: {type: Number},
    redeemedCount: {type: Number},
    isActive: {type: Boolean, default: true},
    expiryDate: {type: Date},
    // voucherId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Vouchers",
    // },
    amount: {type: Number},
    discountedAmount: {type: Number}
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

module.exports = mongoose.model('Packages', Packages);
