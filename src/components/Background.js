// src/components/BackgroundSwitcher.js
import React from 'react';
import imageBackground from '../assets/Cool-Background.jpg';
import '../styles/Background.css';

const Background = () => {
  return (
    <div className="background-container">
      <img src={imageBackground} alt="Background" className="background-image" />
    </div>
  );
};

export default Background;
