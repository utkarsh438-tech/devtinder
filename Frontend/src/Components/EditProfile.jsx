import React, { useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../utils/constants.js'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice.js'
import Usecard from './Usecard.jsx'

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = React.useState(user?.Firstname || '');
  const [lastname, setLastname] = React.useState(user?.Lastname || '');
  const [age, setAge] = React.useState(user?.age || '');
  const [gender, setGender] = React.useState(user?.gender || '');
  const [bio, setBio] = React.useState(user?.bio || '');
  const [photourls, setPhotourls] = React.useState(user?.photourls?.[0] || '');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user) {
      setFirstname(user.Firstname || '');
      setLastname(user.Lastname || '');
      setAge(user.age || '');
      setGender(user.gender || '');
      setBio(user.bio || '');
      setPhotourls(user.photourls?.[0] || '');
    }
  }, [user]);

  const saveProfile = async () => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading('Saving profile...');

    try {
      const res = await axios.patch(
        API_URL + '/profile/edit',
        {
          Firstname: firstname,
          Lastname: lastname,
          age: age,
          gender: gender,
          bio: bio,
          photourls: [photourls],
        },
        { withCredentials: true }
      );

      // backend likely returns: { message, data: updatedUser }
      const updatedUser = res.data?.data || res.data;
      if (updatedUser) {
        dispatch(addUser(updatedUser));
      }

      toast.success(res.data?.message || 'Profile updated successfully', { id: toastId });
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Error updating profile';
      toast.error(msg, { id: toastId });
      console.error('EditProfile save error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-10 gap-12">
      {/* Ensure Toaster is present so toast() calls show up on this page */}
      <Toaster position="top-center" />
      <div className="card bg-base-300 w-90 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Firstname</legend>
            <input
              type="text"
              value={firstname}
              className="input w-full"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Lastname</legend>
            <input
              type="text"
              value={lastname}
              className="input w-full"
              onChange={(e) => setLastname(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              value={age}
              className="input w-full"
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <select
              value={gender || ''}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Bio</legend>
            <input
              type="text"
              value={bio}
              className="input w-full"
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photourls:</legend>
            <input
              type="text"
              value={photourls}
              className="input w-full"
              onChange={(e) => setPhotourls(e.target.value)}
            />
          </fieldset>

          <button className="btn btn-primary my-4" onClick={saveProfile} disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : 'Save Profile'}
          </button>
        </div>
      </div>
     
 
 
 
<Usecard user={{Firstname:firstname,Lastname:lastname,age:age,gender:gender,bio:bio,photourls:[photourls]}} />  
</div>

  )
}

export default EditProfile