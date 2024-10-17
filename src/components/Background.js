import React from 'react';
import '../styles/Background.css';

// Use React.memo to prevent unnecessary re-renders
const Background = React.memo(() => {
  return (
    <div className="background-container">
      {/* Lazy load the image */}
      <img 
        src={require('../assets/Cool-Background.webp')} 
        alt="Background" 
        className="background-image" 
        loading="lazy"
      />
    </div>
  );
});

export default Background;
