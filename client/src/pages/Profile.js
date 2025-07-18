import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Profile() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!password) {
      setError('Please enter your password to continue.');
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      setLoading(true);
      await reauthenticateWithCredential(user, credential);
      await user.delete();
      alert("Account deleted successfully.");
      navigate('/signup', { replace: true });
    } catch (error) {
      setError("Failed to delete account. Please check your password or sign in again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-5 shadow-lg" style={{ width: '600px' }}>
        <div className="d-flex align-items-center">
          <img
            src="/profile.png"
            alt="Profile"
            className="rounded-circle me-4 border"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
          <div>
            <h4 className="fw-bold mb-3">Email:</h4>
            <p className="fs-5">{user?.email}</p>
            <h4 className="fw-bold mt-4">Password:</h4>
            <p className="fs-5">••••••••</p>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-5">
          <button className="btn btn-outline-primary btn-lg" onClick={() => navigate('/home', { replace: true })}>Go to Home</button>
          <button className="btn btn-outline-danger btn-lg" onClick={() => setShowConfirm(true)}>Delete Account</button>
        </div>

        {showConfirm && (
          <div className="alert alert-warning mt-4" role="alert">
            <h5 className="alert-heading">Confirm Account Deletion</h5>
            <p>Please enter your password to confirm account deletion:</p>
            <input
              type="password"
              className="form-control mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {error && <div className="text-danger mb-2">{error}</div>}
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary me-2" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
