import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../data/apiPath';
import './index.css';

const PostForm = ({ theme }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/api/posts/${id}`)
        .then(response => response.json())
        .then(data => {
          setTitle(data.title);
          setContent(data.content);
        })
        .catch(error => {
          console.error('Error fetching post details:', error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const token = Cookies.get('token');
    const url = id ? `${API_URL}/api/posts/${id}` : `${API_URL}/api/posts`;
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        content
      })
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.error); });
        }
        return response.json();
      })
      .then(data => {
        alert(id ? 'Post updated successfully' : 'Post created successfully');
        setTitle('');
        setContent('');
        setError('');
        navigate('/');
      })
      .catch(error => {
        console.error('Error saving post:', error);
        setError(error.message || 'Failed to save post.');
      });
  };

  const handleDelete = () => {
    const token = Cookies.get('token');

    fetch(`${API_URL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete post');
        }
        alert('Post deleted successfully');
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting post:', error);
        setError("You are not authorized to delete this post");
      });
  };

  const styleForm = theme ? null : { backgroundImage: 'radial-gradient(#480151, #9d15b6)' };
  const styleHeading = theme ? null : { color: "#e372ff" };
  const labelStyle = theme ? null : { color: "#e372ff" };

  return (
    <div className='post-form'>
      <h1 style={styleHeading}>{id ? 'Edit Post' : 'Create a Post'}</h1>
      <form onSubmit={handleSubmit} style={styleForm} className='post-form-container'>
        <div className='input-container'>
          <label htmlFor='title' style={labelStyle}>Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write Content"
            required
            className='login-input'
            rows={8}
          />
        </div>
        <Button variant="contained" className='sign-in-btn' type='submit'>
          {id ? 'Update Post' : 'Create Post'}
        </Button>
        {id && (
            <>
            <p className='or-post'>Or</p>
          <Button
            variant="contained"
            color="secondary"
            className='delete-btn'
            onClick={handleDelete}
            style={{ marginLeft: '10px' }}
          >
            Delete Post
          </Button>
          </>
        )}
        {error && <p className='error-message'>{error}</p>}
      </form>
    </div>
  );
};

export default PostForm;
