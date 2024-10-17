import React, { useState, useEffect } from "react";
import Background from '../components/Background';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/Animation - Loading.json';
import congratsAnimation from '../assets/animations/Animation - Congrats_Gold.json';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import AnswersReview from "../components/AnswersReview";
import Retry from '../components/Retry';
import Continue from '../components/Continue';
import '../styles/Results.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Destructure state from location
  const { score, total, questions = [], answers = {}, timeSpent, nextLevel, nextCategory, selectedCategory, selectedLevel } = location.state || {};
  
  const [showAnswers, setShowAnswers] = useState(false);
  const [loading, setLoading] = useState(true);

  // Store the results in localStorage
  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('quizResults')) || [];
    const bestResult = results.find(result => result.category === selectedCategory && result.level === selectedLevel);

    if (!bestResult || score > bestResult.score) {
      const newResult = { category: selectedCategory, level: selectedLevel, score, total, timeSpent };
      const updatedResults = bestResult
        ? results.map(result => (result.category === selectedCategory && result.level === selectedLevel ? newResult : result))
        : [...results, newResult];

      localStorage.setItem('quizResults', JSON.stringify(updatedResults));
    }
    
    setLoading(false);
  }, [score, total, timeSpent, selectedCategory, selectedLevel]);

  const handleViewAnswers = () => {
    console.log('Questions in Results:', questions); // Debugging log
    console.log('Answers in Results:', answers);     // Debugging log
    setShowAnswers(true);
  };

  const handleRetry = () => {
    navigate('/quiz', { state: { category: selectedCategory, level: selectedLevel } });
  };

  const handleContinue = () => {
    if (nextLevel) {
      navigate('/quiz', { state: { category: selectedCategory, level: nextLevel } });
    } else if (nextCategory) {
      navigate('/quiz', { state: { category: nextCategory, level: 'easy' } });
    }
  };

  const handleResetHistory = () => {
    localStorage.removeItem('quizResults');
    navigate('/');
  };

  // Helper function to format time spent
  const formatTimeSpent = (timeSpentInSeconds) => {
    const minutes = Math.floor(timeSpentInSeconds / 60);
    const seconds = timeSpentInSeconds % 60;
    return `${minutes} minutes ${seconds} seconds`;
  };

  return (
    <div className="results-page">
      <Background />
      <Header />
      
      {loading ? ( // Show loading animation while loading
        <div className="loading-container">
          <Lottie animationData={loadingAnimation} loop={true} />
          <p>Loading results...</p>
        </div>
      ) : (
        <main>
          <h1>Quiz Results</h1>

          {/* Congrats animation*/}
          <div className="congrats-animation">
            <Lottie animationData={congratsAnimation} loop={true} style={{ width: '80px', height: '80px' }} />
          </div>

          <p>Your score: {score} out of {total}</p>
          <p>Time spent: {formatTimeSpent(timeSpent)}</p>
          <p>You have completed the quiz.</p>

          <button className="results-page-button" onClick={handleViewAnswers}>View Answers</button>
          <Retry onRetry={handleRetry} />
          {(nextLevel || nextCategory) && <Continue onContinue={handleContinue} />}
          <button className="results-page-button" onClick={() => navigate('/')}>Back Home</button>

          {/* Conditionally render the AnswersReview component based on showAnswers state */}
          {showAnswers && (
            <AnswersReview questions={questions} answers={answers} />
          )}
        </main>
      )}

      <Footer />
    </div>
  );
};

export default Results;
