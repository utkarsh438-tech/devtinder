import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
  

import { useDispatch } from 'react-redux'
import { API_URL } from '../utils/constants.js'
import { addFeed, clearFeed } from '../utils/feedSlice.js'
import { Toaster, toast } from 'react-hot-toast';
import Usecard from './Usecard.jsx';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [isLoading, setIsLoading] = useState(false);
   

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(`${API_URL}/feed`, {
        
        withCredentials: true
      });
      dispatch(addFeed(res.data));
      // if (res.data?.data?.length > 0) {
      //   // If it's first page, replace feed. Otherwise append to existing feed
      //   if (page === 1) {
      //     dispatch(addFeed(res.data.data));
      //   } else {
      //     dispatch(addFeed([...(feed || []), ...res.data.data]));
      //   }
      // } else if (page === 1) {
      //   toast.success("No developers available!");
      // }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Could not fetch feed";
      toast.error(errorMessage);
      dispatch(clearFeed());
      console.error("Feed error:", error);
    } 
  };

  useEffect(() => {
    getFeed();
  }, []);

  // const handleSendRequest = async (userId) => {
  //   try {
  //     await axios.post(`${API_URL}/connection/request`, {
  //       toUserId: userId
  //     }, {
  //       withCredentials: true
  //     });
  //     toast.success("Connection request sent!");
  //     // Remove the user from feed
  //     dispatch(addFeed(feed?.filter(user => user._id !== userId) || []));
  //   } catch (error) {
  //     toast.error("Failed to send connection request");
  //     console.error("Request error:", error);
  //   }
  // };

  return (
    feed?.data?.length > 0 && (
    <div className='flex justify-center my-10 '>
      <Usecard user={feed.data[0]} />
    </div>)
  )
}

export default Feed