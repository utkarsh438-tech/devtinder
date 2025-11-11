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
 if(!feed || !feed.data || feed.data.length === 0) return (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    <h1 className="text-xl font-semibold mb-2">No Developers Found</h1>
    <p className="text-gray-400">Start connecting with other developers to grow your network!</p>
  </div>
);
  return <div className='flex justify-center my-10 '>
    <Usecard user={feed.data[0]} />
  </div>
}

export default Feed