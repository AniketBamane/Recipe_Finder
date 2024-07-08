import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
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
      email: usernameOrEmail,
      password
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Account logged in successfully', {
          duration: 2000,
          style: {
            background: 'green',
            color: 'white',
          },
          icon: '🥳',
        });
        setLoading(false)
        navigate('/');
      } else {
        toast.error(data.message, {
          duration: 2000,
          style: {
            background: "#FF474C",
            color: "white",
          },
        });
        setLoading(false)
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
      setLoading(false)
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
          <label htmlFor="usernameOrEmail">Email:</label>
          <input
            type="text"
            disabled={loading}
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
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
        </div>

        <button  disabled={loading} type="submit" className="login-button">{loading ? "logging in ..." :"Log in"}</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      <p className="signup-text">Don't have an account? <Link to={"/signup"}>Signup now</Link></p>
    </div>
  );
};

export default LoginPage;