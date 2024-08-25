import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import Register from './components/Register';
import LoginWrapper from './components/Login/LoginWrapper';
import UserPosts from './components/Profile';
import NotFound from './components/NotFound';

import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === null ? true : JSON.parse(storedTheme);
  });

  useEffect(() => {
    document.body.style.backgroundImage = theme
      ? null
      : 'linear-gradient(to top, #470052, #6d157a, #821395)';
  }, [theme]);

  return (
    <Router>
      <div>
        <Header theme={theme} setTheme={setTheme} />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<PostList theme={theme} />} />
            <Route path="/post/:id" element={<PostDetail theme={theme} />} />
            <Route path="/create-post" element={<PostForm theme={theme} />} />
            <Route path="/create-post/:id" element={<PostForm theme={theme} />} />
            <Route path="/login" element={<LoginWrapper theme={theme} />} />
            <Route path="/register" element={<Register theme={theme} />} />
            <Route path="/profile" element={<UserPosts theme={theme} />} />
            <Route path="*" element={<NotFound theme={theme} />} />
          </Routes>
        </div>
        <Footer theme={theme} />
      </div>
    </Router>
  );
}

export default App;
