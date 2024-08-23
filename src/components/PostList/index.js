import React, { Component } from 'react';

import { API_URL } from '../../data/apiPath';
import OutlinedCard from './Card';

import './index.css'

class PostList extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    fetch(`${API_URL}/api/posts`)
      .then(response => response.json())
      .then(data => {
        this.setState({ posts: data });
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }

  render() {
    const { posts } = this.state;
    return (
      <div className='posts-conatiner'>
        <h1>Blog Posts</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id} className='list-post'>
              <OutlinedCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostList;
