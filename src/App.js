import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import Register from './components/Register';
// import Logout from './components/Logout';
import './App.css';
import LoginWrapper from './components/Login/LoginWrapper';

function App() {
  const [theme, setTheme] = useState(true)

  
  const bodyStyle = theme ? null : { backgroundImage: 'linear-gradient(to top, #470052, #6d157a, #821395)' };

  return (
    <Router>
      <div>
      <Header theme={theme} setTheme={setTheme} />
        <div className='main-conatiner' style={bodyStyle}>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<PostDetail theme={theme} />} />
          <Route path="/create-post" element={<PostForm theme={theme} />} /> 
          <Route path="/login" element={<LoginWrapper theme={theme}/>} />
          <Route path="/register" element={<Register theme={theme} />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
        </Routes>
        </div>
        <Footer theme={theme} />
      </div>
    </Router>
  );
}

export default App;
