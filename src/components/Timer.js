import React, { useEffect, useState } from 'react';
import '../styles/Timer.css';

const Timer = ({ duration, onTimeUp, setTimeSpent }) => {
   // Convert minutes to seconds
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  useEffect(() => {
    // Calculate and update the time spent
    setTimeSpent(duration * 60 - timeLeft);
  }, [timeLeft, duration, setTimeSpent]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="timer-container">
      <img className="timer-img" src="https://svgshare.com/i/iRM.svg" alt="Timer Icon" />
      <h3>{formatTime(timeLeft)}</h3>
    </div>
  );
};

export default Timer;
