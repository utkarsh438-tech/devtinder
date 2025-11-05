const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['ignored', 'accepted', 'rejected','interested'],
        // default: 'pending'
    }


}, {
    timestamps: true
});

connectionRequestSchema.pre('save', function(next) {
    if (this.fromUserId.toString() === this.toUserId.toString()) {
        return next(new Error("Cannot send connection request to yourself"));
    }

    next();
});
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequest;
