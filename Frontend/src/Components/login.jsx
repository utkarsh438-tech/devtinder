import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice.js'
import { useNavigate } from 'react-router-dom';
import { API_URL as BASEURL } from '../utils/constants.js';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


const handlelogin = async (e) => {
  e?.preventDefault();
  
  if (!email || !password) {
    toast.error('Email and password are required');
    return;
  }

  setIsLoading(true);
  
  try {
    const response = await axios.post(BASEURL + "/login", { Email: email, password }, {
      withCredentials: true
    });
    
    toast.success('Login successful!');
    dispatch(addUser(response.data.data));
    navigate('/');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
    toast.error(errorMessage);
    console.error('Login error:', error);
  } finally {
    setIsLoading(false);
  }
}

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-200 shadow">
  <div className="card-body">
    <h2 className="card-title justify-center">Welcome back</h2>

<div className="flex flex-col gap-4 ">
  




  
    <label className="input validator w-full">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
  <input
   type="email"
   value={email}
    placeholder=" Email"
    onChange={(e)=>setEmail(e.target.value)}
     required />
</label>

<label className="input validator w-full">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>
  <input
    type="password"
    required
    placeholder="Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
  />
</label></div>
      <Toaster position="top-center" reverseOrder={false} />
    <div className="card-actions flex-col gap-2 justify-center my-4">
      <button 
        className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`} 
        onClick={handlelogin}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <button
        className="btn btn-ghost w-full"
        onClick={() => navigate('/signup')}
        disabled={isLoading}
      >
        Create a new account
      </button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
