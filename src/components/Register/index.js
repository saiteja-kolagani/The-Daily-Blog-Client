import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';

import { API_URL } from '../../data/apiPath';

import './index.css'

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    error: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('User registered successfully:', data);
        alert('Registered Successfully');
      })
      .catch(error => {
        console.error('Error registering user:', error);
        this.setState({ error: 'Failed to register.' });
      });
  };

  render() {
    const {theme} = this.props
    const styleForm = theme ? null : {backgroundImage: 'radial-gradient(#480151, #9d15b6)'};
    const styleHeading = theme ? null : {color: "#e372ff"};
    const labelStyle = theme ? null : {color: "#e372ff"}
    const linkStyle = theme ? null : {color: "#e372ff"}
    console.log(this.state.email)
    return (
      <div className='login-container'>
        <form onSubmit={this.handleSubmit} style={styleForm} className='login-form register-form'>
          <h1 style={styleHeading}>Sign Up</h1>
          <div className='input-container'>
            <label style={labelStyle}>Username</label>
            <br />
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
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
              value={this.state.email}
              onChange={this.handleChange}
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
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Enter Password"
              required
              className='login-input'
            />
          </div>
          <Button variant="contained" className='sign-in-btn' type='submit'>
            Sign Up
          </Button>
          {this.state.error && <p>{this.state.error}</p>}
          <Link to="/login" style={linkStyle} className='link-login-form'>Old User? Sign In here</Link>
      </form>
      </div>
    );
  }
}

export default Register;
