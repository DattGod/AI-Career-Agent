import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import LoadingSpinner from '../components/LoadingSpinner';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/', { replace: true });
    } catch (error) {
      setErrorMsg('Sign up failed. ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/', { replace: true });
    } catch (error) {
      setErrorMsg('Google sign-up failed. ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="mb-3 text-center">Sign Up</h4>
        {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="signupEmail" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="signupEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="form-text">Use a valid email address to register.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="signupPassword" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="signupPassword"
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
            <div className="form-text">Password must be at least 6 characters.</div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Register
          </button>
        </form>

        <button className="btn btn-success w-100 mb-2" onClick={handleGoogleSignUp}>
          Sign Up with Google
        </button>

        <div className="text-center">
          <p className="mb-0">
            Already have an account?{' '}
            <button className="btn btn-link p-0" onClick={() => navigate('/', { replace: true })}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
