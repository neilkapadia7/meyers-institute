const mongoose = require('mongoose');

const UserExpiryDetails = mongoose.Schema({
	userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    isUnlimited: {type: Boolean, default: false},
    expiryDate: {type: Date},
    startDate: {type: Date},
    history: [{
        isFreeAccess: {type: Boolean, default: false},
        expiryDate: {type: Date},
        startDate: {type: Date},
    }]
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

module.exports = mongoose.model('UserExpiryDetails', UserExpiryDetails);
