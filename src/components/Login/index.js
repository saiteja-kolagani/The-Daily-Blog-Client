import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import { API_URL } from '../../data/apiPath';

import './index.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          Cookies.set('token', data.token, { expires: 1 });
          alert('Login Successfully');
          this.setState({
            email: '',
            password: '',
            error: ''
          });
          this.props.navigate('/');
        } else {
          this.setState({ error: data.error || 'Login failed. Please check your credentials.' });
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        this.setState({ error: 'Login failed. Please check your credentials.' });
      });
  };

  render() {
    const { theme } = this.props;
    const styleForm = theme ? null : { backgroundImage: 'radial-gradient(#480151, #9d15b6)' };
    const styleHeading = theme ? null : { color: "#e372ff" };
    const labelStyle = theme ? null : { color: "#e372ff" };
    const linkStyle = theme ? null : { color: "#e372ff" };

    return (
      <div className='login-container'>
        <form onSubmit={this.handleSubmit} style={styleForm} className='login-form'>
          <h1 style={styleHeading}>Sign In</h1>
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
            Sign in
          </Button>
          {this.state.error && <p className='error-msg'>{this.state.error}</p>}
          <Link to="/register" style={linkStyle} className='link-login-form'>New User? Sign Up here</Link>
        </form>
      </div>
    );
  }
}

export default Login;
