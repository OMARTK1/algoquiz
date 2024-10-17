// src/pages/ResultsHistory.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/Animation - Loading.json';
import winnerAnimation from '../assets/animations/Animation - Winner.json';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackNavigation from '../components/BackNavigation';
import '../styles/BackNavigation.css';
import '../styles/ResultsHistory.css';

const ResultsHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  const resetHistory = () => {
    localStorage.removeItem('quizResults');
    setResults([]); // Clear results from state
    window.location.reload(); // Reload the page
  };

  useEffect(() => {
    const fetchedResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    setResults(fetchedResults);
    setLoading(false); // Set loading to false after fetching
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Lottie animationData={loadingAnimation} loop={true} />
        <p>Loading results history...</p>
      </div>
    );
  }

  return (
    <div className="results-history-page">
      <Background />
      <Header />
      <main>
        <BackNavigation />
        <h2>Your Quiz Results History</h2>
        <div className="winner-animation">
          <Lottie animationData={winnerAnimation} loop={true} />
        </div>

        {results.length > 0 ? (
          <div>
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  <p>Category: {result.category}</p>
                  <p>Level: {result.level}</p>
                  <p>Score: {result.score} out of {result.total}</p>
                  <p>Time Spent: {Math.floor(result.timeSpent / 60)} minutes {result.timeSpent % 60} seconds</p>
                  <hr />
                </li>
              ))}
            </ul>
            <button onClick={resetHistory}>Reset History</button>
          </div>
        ) : (
          <p>No results available.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ResultsHistory;
