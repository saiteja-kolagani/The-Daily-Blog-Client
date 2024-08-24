import React from 'react';
import Cookies from 'js-cookie';
import {useNavigate, Link} from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';

import './index.css'

const Header = ({theme, setTheme}) => {
    const navigate = useNavigate();

    const token = Cookies.get('token');

    const logOutHandler = () => {
      Cookies.remove('token');
      alert('Sign Out Successfully');
      navigate('/');
    }

    const loginHandler = () => {
        navigate("/login");
    }

    const themeHandler = () => {
        localStorage.setItem("theme", !theme)
        setTheme(!theme)
    }

    const themeStyle = theme ?  "theme-btn-dark" : "theme-btn";

    const headerStyle = theme ? null : { backgroundImage: 'linear-gradient(to right, #470052, #6d157a)' };

    const headingStyle = theme ? null : { color: '#c22be3' };

  return (
    <header className='header' style={headerStyle}>
      <nav className='nav-bar'>
        <div>
            <h1 className='title' style={headingStyle}>The Daily Blog</h1>
        </div>
        {token && (<ul className='header-ul'>
          <li key="home"><Link to="/" className='link-header' style={headingStyle}><HomeIcon className='header-icon' style={{fontSize: 20}} /> Home</Link></li>
          <li key="post"><Link to="/create-post" className='link-header' style={headingStyle}> <AddIcon className='header-icon' style={{fontSize: 20}} /> Post</Link></li>
          <li key="profile"><Link to="/profile" className='link-header' style={headingStyle}> <PersonIcon className='header-icon' style={{fontSize: 20}} /> Profile</Link></li>
        </ul>)}
        <div className='header-theme-container'>
            <button type='button' className={themeStyle} onClick={themeHandler}>
            {theme? <DarkModeIcon /> : <LightModeIcon />}
            </button>
            {token ? <Button variant="contained" disableElevation style={{backgroundColor: "#d23df8"}} className='header-login-btn' onClick={logOutHandler}>
                Sign Out
            </Button> : <Button variant="contained" disableElevation style={{backgroundColor: "#d23df8"}} className='header-login-btn' onClick={loginHandler}>
                Sign In
            </Button>}
        </div>
      </nav>
    </header>
  );
};

export default Header;