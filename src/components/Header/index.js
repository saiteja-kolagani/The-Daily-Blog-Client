import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './index.css';

const Header = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const token = Cookies.get('token');

  const logOutHandler = () => {
    Cookies.remove('token');
    alert('Sign Out Successfully');
    navigate('/');
  };

  const loginHandler = () => {
    navigate("/login");
  };

  const themeHandler = () => {
    localStorage.setItem("theme", !theme);
    setTheme(!theme);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const themeStyle = theme ? "theme-btn-dark" : "theme-btn";
  const headerStyle = theme ? null : { backgroundImage: 'linear-gradient(to right, #470052, #6d157a)' };
  const headingStyle = theme ? null : { color: '#c22be3' };

  return (
    <header className='header' style={headerStyle}>
      <nav className='nav-bar'>
        <div>
          <h1 className='title' style={headingStyle}>The Daily Blog</h1>
        </div>

        <div className='menu'>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Menu
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => { handleClose(); navigate('/'); }}>
              <HomeIcon className='header-icon' style={{ fontSize: 20 }} /> Home
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); themeHandler(); }}>
              {theme ? <DarkModeIcon /> : <LightModeIcon />} Theme
            </MenuItem>
            {token && (
              <>
                <MenuItem onClick={() => { handleClose(); navigate('/create-post'); }}>
                  <AddIcon className='header-icon' style={{ fontSize: 20 }} /> Post
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                  <PersonIcon className='header-icon' style={{ fontSize: 20 }} /> Profile
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); logOutHandler(); }}>
                  Sign Out
                </MenuItem>
              </>
            )}
            {!token && (
              <MenuItem onClick={() => { handleClose(); loginHandler(); }}>
                Sign In
              </MenuItem>
            )}
          </Menu>
        </div>
        
        <div className='header-theme-container'>
          <button type='button' className={themeStyle} onClick={themeHandler}>
            {theme ? <DarkModeIcon /> : <LightModeIcon />}
          </button>
          {token ? (
            <Button variant="contained" disableElevation style={{ backgroundColor: "#d23df8" }} className='header-login-btn' onClick={logOutHandler}>
              Sign Out
            </Button>
          ) : (
            <Button variant="contained" disableElevation style={{ backgroundColor: "#d23df8" }} className='header-login-btn' onClick={loginHandler}>
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
