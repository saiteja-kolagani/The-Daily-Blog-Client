import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { API_URL } from '../../data/apiPath';

import './index.css';

const UserPosts = ({ theme }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');

    fetch(`${API_URL}/api/user/posts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error('Expected an array but got:', data);
          setPosts([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user posts:', error);
        setLoading(false);
      });
  }, []);

  const truncateTextByCharacters = (text) => {
    if (text.length > 40) {
      return text.substring(0, 40) + '...';
    }
    return text;
  };

  const styleHeading = theme ? null : { color: "#e372ff" };

  if (loading) {
    return (
      <div className="loader-container" style={styleHeading}>
        <ThreeDots color="#470052" height={50} width={50} />
      </div>
    );
  }

  if (posts.length === 0) {
    return <div className='profile-container-empty'><p style={styleHeading}>No posts available.</p></div>;
  }

  return (
    <div className='profile-container'>
      <h1 className='welcome-text'>
        Welcome <span className='username-text'>{posts[0]?.username}</span>
      </h1>
      <h1 style={styleHeading}>Your Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} className='my-post-card'>
            <Link to={`/post/${post.id}`} className='link-post-card'>
              <p className='post-id'><span className='post-heading-span'>Post ID: </span>{post.id}</p>
              <h1 className='post-title'><span className='post-heading-span'>Title: </span>{post.title}</h1>
              <p className='post-content'><span className='post-heading-span'>Content: </span>{truncateTextByCharacters(post.content)}</p>
              <p className='post-date'><span className='post-heading-span'>Created at: </span>{post.created_at}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
