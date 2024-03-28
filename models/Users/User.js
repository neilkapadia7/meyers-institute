const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	isFreeUser: {
		type: Boolean,
		default: false
	},
	isPremiumUser: {
		type: Boolean,
		default: false
	},
	referralCode: { // Using which the account was created
		type: String
	},
	referredBy: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
	},
	accessType: {
		type: String,
		enum: ["Instructor", "InstituteAdmin", "BatchAdmin"],
		// default: "SchoolAdmin"
	},
	isAdminUser: {
		type: Boolean,
		default: false
	},
	instituteId: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "Institutes",
	},
	totalReferrals: {type: Number, default: 0},
	isActive: {type: Boolean, default: true},
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

module.exports = mongoose.model('Users', UserSchema);
