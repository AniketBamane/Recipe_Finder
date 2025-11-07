import React, { useState } from 'react';
import '../styles/signup.css';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [loading,setLoading] = useState(false)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const navigate = useNavigate()

  const handleSubmit =async (event) => {
    event.preventDefault();
    console.log('[FRONTEND] Signup attempt started for:', { username, email });
    
    if(username.length <3 ){
      console.log('[FRONTEND] Signup validation failed: Username too short');
      setMessage("username must be at least 3 characters")
      return;
    }
     if(password.length < 6){
      console.log('[FRONTEND] Signup validation failed: Password too short');
      setMessage("password must be at least 6 characters")
      return;
     }
    setLoading(true);
    if (username.length >=3 && email && password.length >=6) {
     if( password === confirmPassword){
      console.log('[FRONTEND] Sending email verification request');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-email`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
      })
      const data = await response.json();
      console.log('[FRONTEND] Email verification response:', { status: response.status, message: data.message });
      
      if(response.ok){
        console.log('[FRONTEND] Email verification successful, navigating to verification page');
        navigate("/verification",{
          state:{
          email,
          password,
          verificationCode : data.verificationCode,
          username
          }
        })
      setMessage('Sign up successful!');
      setMessageColor('green');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setLoading(false);
      }else{
        console.log('[FRONTEND] Email verification failed:', data.message);
        setMessage(data.message);
        setMessageColor('red');
        setLoading(false);
      }
     }else{
      console.log('[FRONTEND] Signup validation failed: Passwords do not match');
      setMessage('Passwords do not match!');
      setMessageColor('red');
      setLoading(false);
     }
    } else {
      console.log('[FRONTEND] Signup validation failed: Missing required fields');
      setMessage('Please fill out all fields correctly.');
      setMessageColor('red');
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Good Food 😊</h1>
      <h2 style={{marginBottom:"10%"}}>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder='atleast 3 characters'
            value={username}
            disabled={loading}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='enter your email'
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Create Password</label>
          <input
            type="password"
            id="password"
            disabled={loading}
            name="password"
            placeholder=' atleast 6 characters'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            disabled={loading}
            name="confirmPassword"
            placeholder=' re-enter your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button disabled={loading} type="submit" onClick={handleSubmit}>{loading ? "sending email for verification":"Sign Up"}</button>
        {message && <p id="message" className='error-message'>{message}</p>}
      <p className="login-link">Already have an account? <Link to={"/signin"}>Login</Link></p>
    </div>
  );
};

export default SignupPage;
