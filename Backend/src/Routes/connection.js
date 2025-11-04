const express = require('express');
const ProfileRouter = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');
 const validator = require('validator');


ProfileRouter.post('/sendConnectionRequest', auth, async (req, res) => {
    try {
        const { toUserId } = req.body;
        if (!toUserId) {
            return res.status(400).send({ message: "toUserId is required" });
        }
        if (req.user._id.toString() === toUserId) {
            return res.status(400).send({ message: "Cannot send connection request to yourself" });
        }
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).send({ message: "User not found" });
        }
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: req.user._id, toUserId: toUserId },
                { fromUserId: toUserId, toUserId: req.user._id }
            ]
        });
        if (existingRequest) {
            return res.status(400).send({ message: "Connection request already exists" });
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId: req.user._id,
            toUserId: toUserId
        });
        await connectionRequest.save();
        res.send({ message: "Connection request sent successfully", connectionRequest });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
});
module.exports = ProfileRouter;