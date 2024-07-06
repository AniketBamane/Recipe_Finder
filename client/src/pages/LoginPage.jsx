import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/login.css';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!validateUsernameOrEmail(usernameOrEmail)) {
      setErrorMessage('Please enter a valid username or email address.');
      return;
    }

    if (password.trim() === '') {
      setErrorMessage('Please enter your password.');
      return;
    }

    const formData = {
      usernameOrEmail,
      password
    };

    try {
      const response = await fetch('login-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        window.location.href = 'dashboard.html';
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const validateUsernameOrEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
    return emailRegex.test(input) || usernameRegex.test(input);
  };

  return (
    <div className="login-form">
      <h1 className="recipe-finder-header">Recipe Finder</h1>
      <h2><em>Great to have you back!</em></h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="usernameOrEmail">Username or Email:</label>
          <input
            type="text"
            id="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FontAwesomeIcon
            icon={passwordVisible ? faEye : faEyeSlash}
            className="eye-icon"
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>
        <div className="form-group">
          <a href="forgot-password.html" className="forgot-password">Forgot password?</a>
        </div>
        <button type="submit" className="login-button">Log in</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      <p className="signup-text">Don't have an account? <a href="signup.html">Signup now</a></p>
    </div>
  );
};

export default LoginPage;
