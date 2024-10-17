import React from 'react';
import '../styles/Retry.css';

const Retry = ({ onRetry }) => {
  return (
    <button onClick={onRetry}><i className="fas fa-redo icon"></i>Retry</button>
  );
};

export default Retry;
