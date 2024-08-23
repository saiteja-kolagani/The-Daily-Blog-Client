import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { API_URL } from '../../data/apiPath';

import './index.css';

const Register = ({ theme }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error || 'Failed to register');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('User registered successfully:', data);
        alert('Registered Successfully');
        setFormData({
          username: '',
          email: '',
          password: '',
        });
        setError('');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        setError(error.message || 'Failed to register.');
      });
  };

  const styleForm = theme ? null : { backgroundImage: 'radial-gradient(#480151, #9d15b6)' };
  const styleHeading = theme ? null : { color: "#e372ff" };
  const labelStyle = theme ? null : { color: "#e372ff" };
  const linkStyle = theme ? null : { color: "#e372ff" };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} style={styleForm} className='login-form register-form'>
        <h1 style={styleHeading}>Sign Up</h1>
        <div className='input-container'>
          <label style={labelStyle}>Username</label>
          <br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter Username"
            required
            autoComplete='off'
            className='login-input'
          />
        </div>
        <div className='input-container'>
          <label style={labelStyle}>Email</label>
          <br />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
            autoComplete='off'
            className='login-input'
          />
        </div>
        <div className='input-container'>
          <label style={labelStyle}>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
            className='login-input'
          />
        </div>
        <Button variant="contained" className='sign-in-btn' type='submit'>
          Sign Up
        </Button>
        {error && <p className="error-message">{error}</p>}
        <Link to="/login" style={linkStyle} className='link-login-form'>
          Old User? Sign In here
        </Link>
      </form>
    </div>
  );
};

export default Register;
