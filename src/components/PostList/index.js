import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { API_URL } from '../../data/apiPath';
import OutlinedCard from './Card';

import './index.css'

class PostList extends Component {
  state = {
    posts: [],
    loading: true
  };

  componentDidMount() {
    fetch(`${API_URL}/api/posts`)
      .then(response => response.json())
      .then(data => {
        this.setState({ posts: data, loading: false });
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }

  render() {
    const { posts } = this.state;
    const {theme} = this.props
    const styleHeading = theme ? null : { color: "#e372ff" };
    if (this.state.loading) {
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
      <div className='posts-conatiner'>
        <h1 style={styleHeading}>Public Posts</h1>
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
