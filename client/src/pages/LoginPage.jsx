import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRecipeContext } from '../store/recipeContext';

const LoginPage = () => {
  const { login } = useRecipeContext();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!validateUsernameOrEmail(usernameOrEmail)) {
      setErrorMessage('Please enter a valid username or email address.');
      setLoading(false);
      return;
    }

    if (password.trim() === '') {
      setErrorMessage('Please enter your password.');
      setLoading(false);
      return;
    }

    const formData = {
      email: usernameOrEmail,
      password
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`, {
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
        login(data.token);
        navigate('/');
      } else {
        toast.error(data.message, {
          duration: 2000,
          style: {
            background: "#FF474C",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateUsernameOrEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
    return emailRegex.test(input) || usernameRegex.test(input);
  };

  return (
    <div className={styles.signInContainer}>
      <h1 className={styles.title}>Good Food 😊</h1>
      <h2 className={styles.subtitle}><em>Great to have you back!</em></h2>
      <form onSubmit={handleLogin}>
        <div className={styles.form}>
          <label htmlFor="usernameOrEmail">Email:</label>
          <div className={styles.inputField}>
            <input
              type="text"
              disabled={loading}
              placeholder=' enter your email...'
              id="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
          </div>
          <label htmlFor="password">Password:</label>
          <div className={styles.inputField}>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              value={password}
              disabled={loading}
              placeholder=' enter your password...'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              className={styles.eyeIcon}
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </div>
          <button disabled={loading} type="submit" className={styles.loginButton}>
            {loading ? "Logging in ..." : "Log in"}
          </button>
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        </div>
      </form>
      <p className={styles.signupLink}>
        Don't have an account? <Link to={"/signup"} style={{color:"blue"}}>Signup now</Link>
      </p>
    </div>
  );
};

export default LoginPage;
