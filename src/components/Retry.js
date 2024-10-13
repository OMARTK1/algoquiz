import React from 'react';
import { useNavigate } from 'react-router-dom';

const Retry = ({ category, level }) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate(`/quiz/${category}/${level}`);
  };

  return (
    <button onClick={handleRetry}>Retry Quiz</button>
  );
};

export default Retry;
