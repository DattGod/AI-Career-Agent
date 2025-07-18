import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/',{ replace: true }); // update this if your route is different (e.g. '/auth/signin')
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed');
    }
  };

  const goToProfile = () => {
    navigate('/profile',{ replace: true });
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">AI Career Agent</span>
        <form className="d-flex">
          <button className="btn btn-outline-primary me-2" type="button" onClick={goToProfile}>
            Profile
          </button>
          <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>
            Log Out
          </button>
        </form>
      </div>
    </nav>
  );
}
