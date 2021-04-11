// import React, { useRef, useState, useMemo, useCallback } from 'react';
import './Header.css';

import { Link, BrowserRouter as Router } from "react-router-dom"

function Header() {
  return (
    <nav id="Header">
      <div className="menu-wrapper sort">
      <Link to="/"><div className="home">Blog</div></Link>
        <div className="divide" />
        <div className="menu-option">
          <Link to="/"><span>posts</span></Link>
          <Link to="/about"><span>about</span></Link>
          <Link to="/write"><span>write</span></Link>
          {/* <Link to="/projects"><span>projects</span></Link>       */}
        </div>
      </div>
    </nav>
  );
}

export default Header;