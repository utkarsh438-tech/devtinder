import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { API_URL  } from '../utils/constants.js';
import { removeUser } from '../utils/userSlice.js';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout =async () => {
    try{
await axios.post(API_URL+"/logout",{},{
  withCredentials:true,
})
      dispatch(removeUser());
      navigate('/loginpage');
    }catch(error){
      // Silent fail - user will be logged out anyway
    }
  }
  return (
    <div> 
 <div className="navbar bg-neutral shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  {user && (<div className="flex gap-2">
    <div className='form-control'> Welcome! {user.Firstname}</div>
    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photourls} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link to="/connections">Connections</Link>
        </li>
         <li>
          <Link to="/requests">Requests</Link>
        </li>
        <li>
          <button type="button" onClick={handleLogout} className="w-full text-left">Logout</button>
        </li>
      </ul>
    </div>
  </div>)}
</div>
    </div>
  )
}

export default Navbar