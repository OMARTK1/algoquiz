import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/Animation - Loading.json';
import '../styles/Loading.css';

const Loading = React.memo(() => {
  return (
    <div className="loading-container">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
});

export default Loading;
