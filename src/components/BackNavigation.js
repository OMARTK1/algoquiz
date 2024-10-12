// src/components/BackNavigation.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackNavigation = ({ resetCategory, resetLevel }) => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/')}>Back to Home</button>
      {resetCategory && (
        <button onClick={resetCategory}>Back to Category</button>
      )}
      {resetLevel && (
        <button onClick={resetLevel}>Back to Level</button>
      )}
    </div>
  );
};

export default BackNavigation;
