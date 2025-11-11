import React from 'react'
import { Outlet } from 'react-router-dom'
import Fotter from './Fotter'
import Navbar from './Navbar'
import { useNavigate  } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {  API_URL } from '../utils/constants.js'
import { addUser } from '../utils/userSlice.js'
import { Toaster } from 'react-hot-toast'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((store) => store.user);
 

const fetchUserData=async()=>{
  try{
    const res = await axios.get(API_URL + '/profile/view', {
      withCredentials: true,
    });
    dispatch(addUser(res.data?.data));
  }catch(error){
      if (error.message.includes('401') || error.message.includes('Unauthorized')) { 
         
          navigate("/loginpage");
        
      }
      console.log({error})
  }
};
useEffect(()=>{
   
    fetchUserData();
  },[]);

  return (

    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-900 via-gray-900 to-black" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"></div>

      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Fotter />
    </div>
  )
}

export default Body