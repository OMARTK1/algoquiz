import React from 'react';
import '../styles/Retry.css';

const Retry = React.memo(({ onRetry }) => {
  return (
    <button onClick={onRetry}><i className="fas fa-redo icon"></i>Retry</button>
  );
});

export default Retry;
