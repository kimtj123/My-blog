import React from 'react';
import './Header.css';

import { Link, Route, BrowserRouter as Router } from "react-router-dom"

// import { Main } from '../Main/Main'

function Header() {
  return (
    <nav id="Header">
      <div className="menu-wrapper sort">
        <div className="home">TJ's Blog</div>
        <div className="divide" />
        <div className="menu-option">
          <Link to="/"><span>posts</span></Link>
          <Link to="/about"><span>about</span></Link>
          <Link to="/projects"><span>projects</span></Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
