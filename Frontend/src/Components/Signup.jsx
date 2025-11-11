import React, { useMemo, useState } from 'react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score; // 0 - 5
  }, [password]);

  const passwordStrengthLabel = useMemo(() => {
    if (!password) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength === 3) return 'Medium';
    return 'Strong';
  }, [password, passwordStrength]);

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
    <div className="min-h-[80vh] bg-linear-to-b from-base-200 to-base-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="card bg-base-300 shadow-xl border border-base-200">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10">
              <h2 className="card-title">Create your account</h2>
              <p className="mt-1 text-sm opacity-70">
                Join the community and connect with developers.
              </p>

              <div className="flex flex-col gap-3 mt-6">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="John"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Doe"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                <label className="form-control">
                  <div className="label justify-between">
                    <span className="label-text">Password</span>
                    <span className="label-text-alt opacity-70">
                      {passwordStrengthLabel}
                    </span>
                  </div>
                  <div className="join w-full">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="input input-bordered join-item w-full"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                      required
                    />
                    <button
                      type="button"
                      className="btn join-item"
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="mt-2 h-2 bg-base-200 rounded">
                    <div
                      className={`h-2 rounded transition-all ${
                        passwordStrength <= 2
                          ? 'bg-error w-1/3'
                          : passwordStrength === 3
                          ? 'bg-warning w-2/3'
                          : 'bg-success w-full'
                      }`}
                    />
                  </div>
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Confirm Password</span>
                  </div>
                  <div className="join w-full">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="input input-bordered join-item w-full"
                      placeholder="********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn join-item"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {confirmPassword && confirmPassword !== password && (
                    <span className="mt-1 text-xs text-error">
                      Passwords do not match
                    </span>
                  )}
                </label>
              </div>

              <Toaster position="top-center" reverseOrder={false} />

              <div className="card-actions flex-col gap-2 justify-center mt-6">
                <button
                  className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                  onClick={handleSignup}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing up...' : 'Create account'}
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

            <div className="bg-base-200 rounded-r-box hidden md:flex items-center justify-center p-8">
              <div className="text-center max-w-xs">
                <div className="avatar mb-4">
                  <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="https://api.dicebear.com/9.x/identicon/svg?seed=devtinder" />
                  </div>
                </div>
                <h3 className="font-semibold">Welcome to DevTinder</h3>
                <p className="text-sm opacity-70 mt-1">
                  Find and connect with developers who match your interests and skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

