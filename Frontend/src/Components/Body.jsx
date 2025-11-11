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
    // backend returns { message, data: user }
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

    <div>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
      <Fotter />
    </div>
  )
}

export default Body