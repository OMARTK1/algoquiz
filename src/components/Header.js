import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
  const [isNavVisible, setNavVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleNav = () => setNavVisible(!isNavVisible);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaQueryChange = (event) => setIsSmallScreen(event.matches);

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  return (
    <header className="header-container">
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </div>
      <div className="logo-container">
        <Link to="/">
          <img src={require('../assets/Logo_algoquiz.png')} alt="AlgoQuiz" className="app-logo" />
        </Link>
      </div>
      {isSmallScreen && (
        <button className="menu-toggle" onClick={toggleNav}>
          <span className="hamburger-icon">&#9776;</span>
        </button>
      )}
      <nav className={`nav ${isNavVisible ? 'show' : ''}`}>
        <ul className="nav-list">
          <li><Link to="/" onClick={toggleNav}>Home</Link></li>
          <li><Link to="/quiz" onClick={toggleNav}>Quiz</Link></li>
          <li><Link to="/results-history" onClick={toggleNav}>Results</Link></li>
          <li><Link to="/about" onClick={toggleNav}>About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;