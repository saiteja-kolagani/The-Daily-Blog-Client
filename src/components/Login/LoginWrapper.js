import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './index.js';

const LoginWrapper = (props) => {
  const navigate = useNavigate();
  return <Login navigate={navigate} {...props} />;
};

export default LoginWrapper;
