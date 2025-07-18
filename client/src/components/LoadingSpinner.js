import React from 'react';
import spinner from '../assets/Search.gif'; // adjust path as needed

export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <img src={spinner} alt="Loading..." style={{ width: '100px', height: '100px' }} />
    </div>
  );
}
