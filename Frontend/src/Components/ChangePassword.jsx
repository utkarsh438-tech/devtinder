import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants.js';
import toast from 'react-hot-toast';

const ChangePassword = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    if (!newPassword) return 0;
    let score = 0;
    if (newPassword.length >= 8) score += 1;
    if (/[A-Z]/.test(newPassword)) score += 1;
    if (/[a-z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;
    return score;
  }, [newPassword]);

  const isPasswordValid = newPassword.length >= 8 && 
    /[A-Z]/.test(newPassword) && 
    /[a-z]/.test(newPassword) && 
    /[0-9]/.test(newPassword);

  const canSubmit = oldPassword && isPasswordValid && 
    confirmNewPassword === newPassword && !loading;

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword) {
      toast.error('Please fill all password fields');
      return;
    }
    if (!isPasswordValid) {
      toast.error('New password is not strong enough');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Updating password...');
    
    try {
      const res = await axios.patch(
        API_URL + '/profile/password',
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      toast.success(res.data?.message || 'Password updated successfully', { id: toastId });
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Failed to update password';
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="card w-full max-w-lg bg-base-200 shadow">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h3 className="card-title">Change Password</h3>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
          </div>

          <div className="grid gap-3 mt-2">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Current Password</span>
              </div>
              <div className="join w-full">
                <input
                  type={showOld ? 'text' : 'password'}
                  className="input input-bordered join-item w-full"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <button 
                  type="button" 
                  className="btn join-item" 
                  onClick={() => setShowOld(s => !s)}
                >
                  {showOld ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <label className="form-control">
              <div className="label justify-between">
                <span className="label-text">New Password</span>
                {newPassword && (
                  <span className="label-text-alt">
                    {passwordStrength <= 2 ? 'Weak' : passwordStrength === 3 ? 'Medium' : 'Strong'}
                  </span>
                )}
              </div>
              <div className="join w-full">
                <input
                  type={showNew ? 'text' : 'password'}
                  className="input input-bordered join-item w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <button 
                  type="button" 
                  className="btn join-item" 
                  onClick={() => setShowNew(s => !s)}
                >
                  {showNew ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="mt-2 h-2 bg-base-300 rounded">
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
              {!isPasswordValid && newPassword && (
                <p className="mt-2 text-xs text-gray-500">
                  Password must be 8+ chars and include upper, lower and number.
                </p>
              )}
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Confirm New Password</span>
              </div>
              <div className="join w-full">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className="input input-bordered join-item w-full"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                <button 
                  type="button" 
                  className="btn join-item" 
                  onClick={() => setShowConfirm(s => !s)}
                >
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              </div>
              {confirmNewPassword && confirmNewPassword !== newPassword && (
                <span className="mt-1 text-xs text-error">
                  Passwords do not match
                </span>
              )}
            </label>

            <div className="card-actions mt-2">
              <button
                className="btn btn-primary w-full"
                disabled={!canSubmit}
                onClick={handleSubmit}
              >
                {loading ? <span className="loading loading-spinner"></span> : 'Update Password'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

