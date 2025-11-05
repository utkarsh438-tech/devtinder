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
        res.json({ message: "Connection request sent successfully", data: connectionRequest });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
});
ProfileRouter.post('/request/send/:status/:userId', auth, async (req, res) => {
 try{
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;


    if (!['ignored','interested'].includes(status)) {
        return res.status(400).send({ message: "Invalid status" });}


        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(404).send({ message: "User not found" });
        }
    // const connectionRequest = await ConnectionRequest.findOne({ fromUserId, toUserId });
    // if (!connectionRequest) {
    //     return res.status(404).send({ message: "Connection request not found" });
    // }


    //if there is existing connection request, update it
    const existingRequest = await ConnectionRequest.findOne({
$or:[
    { fromUserId, toUserId },
    { fromUserId: toUserId, toUserId: fromUserId }
] 
         });
    if( existingRequest ){
        return res.status(400).send({ message:  "Connection request already exists" });
        // res.json({ message: `Connection request ${status} successfully`, connectionRequest: existingRequest });
    }



    const connectionRequest=new ConnectionRequest({ fromUserId, toUserId, status });
    await connectionRequest.save();
    res.json({ message: `Connection request ${status} successfully`, data: connectionRequest });
 }catch(error){
    res.status(400).send({ message: "Server error", error: error.message });
 }
});


ProfileRouter.post('/request/review/:status/:requestId', auth, async (req, res) => {
    try{
const LoggedInUserId=req.user._id;
const requestId=req.params.requestId;
const status=req.params.status;

const allowedstatus=['accepted','rejected'];
if(!allowedstatus.includes(status)){
    return res.status(400).send({message:"Invalid status"});
}
const connectionRequest=await ConnectionRequest.findOne({
    _id: requestId,
    toUserId: LoggedInUserId,
    status:'interested'

});
if(!connectionRequest){
    return res.status(404).send({message:"Connection request not found"});
}
if(connectionRequest.status === 'accepted' || connectionRequest.status === 'rejected'){
    return res.status(400).send({message:"Connection request already reviewed"});
}
connectionRequest.status=status;
await connectionRequest.save();
res.json({message:`Connection request ${status} successfully`, data: connectionRequest});



    }catch(error){
        res.status(400).send({message:"Server error",error:error.message});
    }
})
module.exports = ProfileRouter;