import React from 'react';
import {useNavigate} from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Button from '@mui/material/Button';

import './index.css'

const Header = ({theme, setTheme}) => {
    const navigate = useNavigate();
    const loginHandler = () => {
        navigate("/login");
    }

    const themeHandler = () => {
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
        <div className='header-theme-container'>
            <button type='button' className={themeStyle} onClick={themeHandler}>
            {theme? <DarkModeIcon /> : <LightModeIcon />}
            </button>
            <Button variant="contained" disableElevation style={{backgroundColor: "#d23df8"}} className='header-login-btn' onClick={loginHandler}>
                Sign In
            </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
