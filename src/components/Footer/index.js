import React from 'react';

import './index.css'

const Footer = ({theme}) => {
  const footerStyle = theme ? null : {backgroundColor: "#470052"};
  const spanStyle = theme ? null : {color: "#d23df8"};
  const paraStyle = theme ? null : {color: "#fcf3ff"};
  return (
    <footer className='footer' style={footerStyle}>
      <p style={paraStyle}>&copy; 2024 The Daily Blog. All rights reserved. Developed by <span><a href="https://saitejakolagani.ccbp.tech/" target='__blank' style={spanStyle}>Sai Teja Kolagani</a></span></p>
    </footer>
  );
};

export default Footer;
