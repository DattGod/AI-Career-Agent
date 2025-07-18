import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import LoadingSpinner from '../components/LoadingSpinner';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home', { replace: true });
    } catch (error) {
      setErrorMsg('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    loading ? <LoadingSpinner /> : (
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
          <h4 className="mb-3 text-center">Sign In</h4>
          {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
          <form onSubmit={handleSignIn}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '🐵'}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
          <div className="text-center">
            <p className="mb-0">Don't have an account? <button className="btn btn-link p-0" onClick={() => navigate('/signup', { replace: true })}>Sign Up</button></p>
          </div>
        </div>
      </div>
    )
  );
}
