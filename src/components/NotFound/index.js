import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './index.css';

const NotFound = ({ theme }) => {
  const styleHeading = theme ? null : { color: "#e372ff" };
  return (
    <div className="not-found-container">
      <h1 style={styleHeading}>404 - Page Not Found</h1>
      <p style={styleHeading}>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="not-found-link" style={styleHeading}><ArrowBackIcon className='animate-ping' />Go Back to Home</Link>
    </div>
  );
};

export default NotFound;
