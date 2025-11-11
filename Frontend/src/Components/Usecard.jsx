import React from 'react'
import axios from 'axios'
import { API_URL } from '../utils/constants.js'
import { useDispatch } from 'react-redux'
import { clearFeed } from '../utils/feedSlice.js'
import { toast } from 'react-hot-toast'



const Usecard = ({user }) => {
  const dispatch = useDispatch();
const handleFriendReq=async(status,_id)=>{
  try{
const res=await axios.post(API_URL+"/request/send/"+status+"/"+_id,
  {},
  {
  withCredentials:true
}
);
dispatch(clearFeed(_id));
if(status === "interested"){
  toast.success("Connection request sent successfully!");
} else if(status === "ignored"){
  toast.success("User ignored");
}
  }catch(error){
    console.error("Error sending friend request:", error);
    const errorMessage = error.response?.data?.message || "Failed to process request";
    toast.error(errorMessage);
  }
}


    const {_id,Firstname , Lastname , photourls , age , gender , bio} = user;
  return (
   <div  
   key={_id}
   className="card  bg-gray-950 w-96 shadow-sm">
  <figure>
    <img className="h-96 w-full object-cover"
      src={photourls?.[0] || "https://via.placeholder.com/150"}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{Firstname || "Unknown"} {Lastname || "User"}</h2>
    {age && gender && <p>{age +" " +gender}</p>}
    <p>{bio || "No bio available"}</p>
    <div className="card-actions  flex justify-center gap-4">
         <button className="btn btn-secondary" onClick={()=>handleFriendReq("ignored",_id)}>Ignore</button>
      <button className="btn btn-primary" onClick={()=>handleFriendReq("interested",_id)}>Send Request</button>
    </div>
  </div>
</div>
  )
}

export default Usecard