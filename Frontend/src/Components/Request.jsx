import React from 'react'
 import { useEffect } from 'react'
 import axios from 'axios'
 import { API_URL } from '../utils/constants.js'
import { useDispatch, useSelector } from 'react-redux'

import { addRequests } from '../utils/RequestSlice'




 const Request = () => {

const dispatch = useDispatch();
const requests =useSelector((store)=>store.request);


const reviewrequest = async (_id, status) => {
  try {
    await axios.post(
      API_URL + "/request/review/" + status + "/" + _id,
      {},
      { withCredentials: true }
    );
    fetchRequests(); // Refetch requests to update UI after review
  } catch (error) {
    console.log({ error });
  }
};


  const fetchRequests=async()=>{
    try{
      const res = await axios.get(API_URL + '/users/requests/recieved', {
        withCredentials: true,
      });
      dispatch(addRequests(res.data?.data));
  }catch(error){
    console.log({error})
  }}

useEffect(()=>{
  fetchRequests();
},[]);

  if (!requests || requests.length === 0) {
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
      <h1 className="text-3xl font-bold text-center mb-8">Your Requests</h1>

      <div className="  flex justify-center  gap-6">
        {requests.map((request) => {
          const { _id,Firstname, Lastname, photourls, bio, age, gender } =request.fromUserId;
          return (
            <div key={_id}
            className="card  bg-gray-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <figure className="px-4 pt-4">
                <img
                  src={photourls?.[0] || "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740&q=80"}
                  alt={`${Firstname}'s photo`}
                  className="rounded-xl w-32 h-32 object-cover"
                  onError={(e) => {
                    e.target.src = "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740&q=80";
                  }}
                  loading="lazy"
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
                   <button
                    className="btn btn-warning btn-sm"
                    onClick={() =>  reviewrequest(request._id,'rejected')}
                  >
                    Reject
                  </button>
                   <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>  reviewrequest(request._id,'accepted'
                    )}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
   )
 }

 export default Request
