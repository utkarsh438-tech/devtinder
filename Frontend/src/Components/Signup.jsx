import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { API_URL as BASEURL } from '../utils/constants.js';

const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e?.preventDefault();

    if (!firstname.trim() || !lastname.trim()) {
      toast.error('First name and Last name are required');
      return;
    }

    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        `${BASEURL}/signup`,
        {
          Firstname: firstname.trim(),
          Lastname: lastname.trim(),
          Email: email.trim(),
          password
        },
        { withCredentials: true }
      );

      toast.success('Signup successful! Please login.');
      setTimeout(() => navigate('/loginpage'), 800);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Signup failed. Please try again.';
      toast.error(errorMessage);
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Create Account</h2>
          <div className="flex flex-col gap-4">
            <label className="input validator w-full">
              <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </label>
            <label className="input validator w-full">
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </label>
            <label className="input validator w-full">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="input validator w-full">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                required
              />
            </label>
            <label className="input validator w-full">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>

          <Toaster position="top-center" reverseOrder={false} />

          <div className="card-actions flex-col gap-2 justify-center my-4">
            <button
              className={`btn btn-primary w-full ${
                isLoading ? 'loading' : ''
              }`}
              onClick={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
            <button
              className="btn btn-ghost w-full"
              onClick={() => navigate('/loginpage')}
              disabled={isLoading}
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

