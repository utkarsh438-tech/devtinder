import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { API_URL } from '../utils/constants.js'
import { addConnections } from '../utils/connectionSlice.js'
import { useEffect } from 'react';
import Usecard from './Usecard';
import { toast } from 'react-hot-toast';

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConnections = async () => {
    const loadingToast = toast.loading('Loading your connections...');
    try {
      const res = await axios.get(API_URL + '/users/requests/connections', { withCredentials: true });
      dispatch(addConnections(res.data?.data));
      setError(null);
      toast.success('Connections loaded successfully!', { id: loadingToast });
    } catch (error) {
      console.log({ error });
      setError('Failed to load connections');
      toast.error('Failed to load connections. Please try again.', { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Only fetch if connections don't exist in store
    if (!connections) {
      fetchConnections();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h1 className="text-xl font-semibold mb-2">No Connections Found</h1>
        <p className="text-gray-400">Start connecting with other developers to grow your network!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Connections</h1>
      
      <div className="  flex justify-center  gap-6">
        {connections.map((connection) => {
          const {_id, Firstname, Lastname, photourls, bio, age, gender } = connection;
          return (
            <div 
            key={_id}
            className="card  bg-gray-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <figure className="px-4 pt-4">
                <img
                  src={photourls?.[0] || 'https://via.placeholder.com/150'}
                  alt={`${Firstname}'s photo`}
                  className="rounded-xl w-32 h-32 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-xl font-semibold">
                  {Firstname} {Lastname}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-500 mb-2">
                    {age} • {gender}
                  </p>
                )}
                {bio && (
                  <p className="text-gray-600 line-clamp-3">
                    {bio}
                  </p>
                )}
                <div className="card-actions mt-4">
                  {/* <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => toast.success(`Starting chat with ${Firstname}...`)}
                  >
                    Message
                  </button> */}
                  {/* <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => toast('Viewing profile...', {
                      icon: '👀',
                      duration: 2000
                    })}
                  >
                    View Profile
                  </button> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Connection
