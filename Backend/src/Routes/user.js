const express = require('express');
const UserRouter = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');

UserRouter.get('/users/requests/recieved', auth, async (req, res) => {
    try {
const LoggedInUserId=req.user._id;
const ConnectionRequests=await ConnectionRequest.find({
    toUserId:LoggedInUserId,
    status:'interested'
}).populate('fromUserId',['Firstname','Lastname','bio','skills','photourls']);


res.json({
    message:"Connection Requests fetched successfully",
    data: ConnectionRequests
})
        
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
 
});

UserRouter.get('/users/requests/connections', auth, async (req, res) => {
    try{
const LoggedInUserId=req.user._id;
const Connections=await ConnectionRequest.find({
    $or:[
        {fromUserId:LoggedInUserId,status:'accepted'},
        {toUserId:LoggedInUserId,status:'accepted'}
    ]
}).populate('fromUserId',['Firstname','Lastname','photourls','bio','skills'])
.populate('toUserId',['Firstname','Lastname','photourls','bio','skills']);

// const valueinfo=Connections.map((row)=>row.fromuserId)

const valueddata= Connections.map((connection)=>{
    if(connection.fromUserId._id.toString()===LoggedInUserId.toString()){
        return connection.toUserId;}
    else{
        return connection.fromUserId;
    }})
res.json({
    message:"Connections fetched successfully",
    data:   valueddata
})
    }catch (error) {
        res.status(400).send({ message: "Server error", error: error.message });
    }
})

UserRouter.get('/feed', auth, async (req, res) => {
    try {
        const LoggedInUserId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
 
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: LoggedInUserId },
                { toUserId: LoggedInUserId }
            ]
        }).select('fromUserId toUserId');

 
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach(request => {
            hideUsersFromFeed.add(request.fromUserId.toString());
            hideUsersFromFeed.add(request.toUserId.toString());
        });

       
        const users = await User.find({
            $and:[
                { _id: { $nin: Array.from(hideUsersFromFeed)} },
        { _id: { $ne: LoggedInUserId } }
    ]
        
    })
    .select('Firstname Lastname photourls bio skills').skip(skip).limit(limit);

        res.json({
            message: "Feed fetched successfully",
            data: users
        });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
});
module.exports = UserRouter;