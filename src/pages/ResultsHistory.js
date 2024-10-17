import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackNavigation from '../components/BackNavigation';
import Background from '../components/Background';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/Animation - Loading.json';
import winnerAnimation from '../assets/animations/Animation - Winner.json';
import '../styles/BackNavigation.css';
import '../styles/ResultsHistory.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ResultsHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  const resetHistory = () => {
    localStorage.removeItem('quizResults');
    setResults([]);
    window.location.reload();
  };

  useEffect(() => {
    const fetchedResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    setResults(fetchedResults);
    setLoading(false);
  }, []);

  return (
    <div className="results-history-page">
      <Background />
      <Header />
      <main>
        <BackNavigation />
        <h2>Your Quiz Results History</h2>

        {/* Winner animation */}
        <div className="winner-animation">
          <Lottie animationData={winnerAnimation} loop={true} />
        </div>

        {loading ? ( // Show loading animation while loading
          <div className="loading-container">
            <Lottie animationData={loadingAnimation} loop={true} />
            <p>Loading results history...</p>
          </div>
        ) : results.length > 0 ? (
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
