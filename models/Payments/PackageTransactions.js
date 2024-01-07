const mongoose = require('mongoose');

const PackageTransactions = mongoose.Schema({
        gateway: {
          type: String,
        //   enum: ['razorpay'],
          default: 'razorpay',
        },
        isFreeTransaction: { type: Boolean, default: false },
        razorpaySignature: { type: String },
        razorpayOrderId: { type: String },
        razorpayTransactionId: { type: String },
        razorpayStatus: { type: String },
        razorpayTransactionAmount: { type: Number },
        packagePrice: { type: Number },
        packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Packages' },
        voucherId: { type: String },
        voucher: { type: mongoose.Schema.Types.ObjectId, ref: 'Vouchers' },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users"
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

module.exports = mongoose.model('PackageTransactions', PackageTransactions);
