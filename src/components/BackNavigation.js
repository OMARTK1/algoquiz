import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BackNavigation.css';

const BackNavigation = ({ resetCategory, resetLevel }) => {
  const navigate = useNavigate();

  return (
    <div className="back-navigation">
      <button onClick={() => navigate('/')}>
        <i className="fas fa-home icon"></i> Back Home
      </button>
      {resetCategory && (
        <button onClick={resetCategory}>
          Back to Category
        </button>
      )}
      {resetLevel && (
        <button onClick={resetLevel}>
          Back to Level
        </button>
      )}
    </div>
  );
};

export default BackNavigation;