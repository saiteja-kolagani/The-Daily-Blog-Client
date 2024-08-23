import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import { API_URL } from '../../data/apiPath';

import './index.css'

class PostForm extends Component {
  state = {
    title: '',
    content: '',
    error: ''
  };

    handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
    e.preventDefault();
    
    const token = Cookies.get('token');

    fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
        title: this.state.title,
        content: this.state.content
        })
    })
        .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error); });
        }
        return response.json();
        })
        .then(data => {
        alert('Post created successfully');
        })
        .catch(error => {
        console.error('Error creating post:', error);
        this.setState({ error: 'Failed to create post.' });
        });
    };

    render() {
        const { theme } = this.props;
        const styleForm = theme ? null : { backgroundImage: 'radial-gradient(#480151, #9d15b6)' };
        const styleHeading = theme ? null : { color: "#e372ff" };
        const labelStyle = theme ? null : { color: "#e372ff" };
        return (
            <div className='post-form'>
                <h1 style={styleHeading}>Create a Post</h1>
                <form onSubmit={this.handleSubmit} style={styleForm} className='post-form-container'>
                    <div className='input-container'>
                        <label htmlFor='title' style={labelStyle}>Title</label>
                        <br />
                        <input
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder="Title of the Blog"
                        required
                        className='login-input'
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor='content' style={labelStyle}>Content</label>
                        <br />
                        <textarea
                        name="content"
                        value={this.state.content}
                        onChange={this.handleChange}
                        placeholder="Write Content"
                        required
                        className='login-input'
                        rows={8}
                        />
                    </div>
                    <Button variant="contained" className='sign-in-btn' type='submit'>
                        Create Post
                    </Button>
                    {this.state.error && <p>{this.state.error}</p>}
                </form>
            </div>
        );
    }
}

export default PostForm;
