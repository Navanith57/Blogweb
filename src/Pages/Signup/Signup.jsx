import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ username, password }));

   
    navigate('/');
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>

      {error && <p className="error-message">{error}</p>}

      <label>
        <h3>Enter Username</h3>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </label>

      <label>
        <h3>Enter Password</h3>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </label>

      <label>
        <h3>Confirm Password</h3>
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
      </label>

      <button className="btn" onClick={handleSignup}>Signup</button>

      <p>Already have an account? <Link to="/">Login</Link></p>

    </div>
  );
};

export default Signup;
