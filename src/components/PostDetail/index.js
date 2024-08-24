import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { API_URL } from '../../data/apiPath';

import './index.css'

const PostDetail = ({theme}) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
      })
      .catch(error => {
        console.error('Error fetching post details:', error);
      });
  }, [id]);

  if (!post) return <p>Loading...</p>;

  const styleTitle = theme ? null : { color: "#e372ff" };
  const styleContent = theme ? null : {color: "#f3ceff"}
  const styleDetails = theme ? null : {color: "#eda7ff"}

  return (
    <div className='post-detail-container'>
      <p style={styleDetails} className='post-id'>{`Post ID ${post.id}`}</p>
      <h1 className='post-details-heading' style={styleTitle}>{post.title}</h1>
      <p style={styleContent} className='post-content'>{post.content}</p>
      <p style={styleDetails} className='post-details'>
        {`Created at ${post.created_at}, Created by `}
        <span>{post.user_name}</span>
        {`, User ID ${post.user_id}`}
      </p>
      <Link to={`/create-post/${id}`} className='link-details'>Edit <EditIcon className='edit-icon' style={{fontSize: 20}} /></Link>
    </div>
  );
};

export default PostDetail;
