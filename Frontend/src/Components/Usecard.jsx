 import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../utils/constants.js'
import { useDispatch } from 'react-redux'
import { clearFeed } from '../utils/feedSlice.js'
import { toast } from 'react-hot-toast'



const Usecard = ({user, hideActions = false }) => {
  const dispatch = useDispatch();
  const [isFading, setIsFading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

const handleFriendReq=async(status,_id)=>{
  try{
    setIsProcessing(true);
    dispatch(clearFeed(_id));
    const res=await axios.post(API_URL+"/request/send/"+status+"/"+_id,
      {},
      {
      withCredentials:true
    }
    );
    if(status === "interested"){
      toast.success("Connection request sent successfully!");
    } else if(status === "ignored"){
      toast.success("User ignored");
    }
    }catch(error){
      console.error("Error sending friend request:", error);
      const errorMessage = error.response?.data?.message || "Failed to process request";
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
      setIsFading(false);
    }
}


    const {_id,Firstname , Lastname , photourls , age , gender , bio} = user;
  return (
   <div  
   key={_id}
   className={`card w-96 shadow-xl backdrop-blur-xl bg-white/5 border border-white/10 ${isFading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
  <figure>
    <img className="h-96 w-full object-cover"
      src={photourls?.[0] || "https://via.placeholder.com/150"}
      alt="photo" />
  </figure>
  <div className="card-body text-white">
    <h2 className="card-title">{Firstname || "Unknown"} {Lastname || "User"}</h2>
    {age && gender && <p className="text-white/80">{age +" " +gender}</p>}
    <p className="text-white/80">{bio || "No bio available"}</p>
    {!hideActions && (
      <div className="card-actions  flex justify-center gap-4">
           <button
            className="btn btn-secondary"
            disabled={isProcessing}
            onClick={()=>{ setIsFading(true); handleFriendReq("ignored",_id);}}
           >
            Ignore
           </button>
        <button
          className="btn btn-primary"
          disabled={isProcessing}
          onClick={()=>{ setIsFading(true); handleFriendReq("interested",_id);}}
        >
          Send Request
        </button>
      </div>
    )}
  </div>
</div>
  )
}

export default Usecard