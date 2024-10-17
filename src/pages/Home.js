// src/pages/Home.js
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link } from "react-router-dom";
import Background from '../components/Background';
import Header from '../components/Header';
import Footer from '../components/Footer';
import loadingAnimation from '../assets/animations/Animation - Loading.json';
import '../styles/Home.css';

const LazyLottie = lazy(() => import('lottie-react')); // Lazy load Lottie
const homeAnimation = require('../assets/animations/Animation - Home_quote.json');

const Home = () => {
  const [isDropdownOpen, setDropdownOpen] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDropdown = (language) => {
    setDropdownOpen(prevState => ({
      ...prevState,
      [language]: !prevState[language],
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Suspense fallback={<div>Loading Animation...</div>}>
          <LazyLottie animationData={loadingAnimation} loop={true} />
        </Suspense>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Background />
      <Header />
      <main className="main-content">
        <div className="home-content">
          <h2>Welcome to AlgoQuiz!</h2>
          <div className="lottie-container">
            <Suspense fallback={<div>Loading Animation...</div>}>
              <LazyLottie animationData={homeAnimation} loop={true} />
            </Suspense>
          </div>

          <p>
            Ready to sharpen your coding skills and master algorithms? AlgoQuiz is designed to test and enhance your understanding of algorithms and data structures, a crucial part of any developer's toolkit. Whether you’re a beginner or a seasoned programmer, AlgoQuiz offers engaging and challenging quizzes that cover essential topics.
          </p>
          <p>
            For more coding tutorials and resources, check out <a className="w3school" href="https://www.w3schools.com/" target="_blank" rel="noopener noreferrer">W3Schools</a>.
          </p>
          <Link className="quiz-link" to="/quiz">Start Quiz</Link>

          <div className="dropdowns">
            {['C', 'Python', 'JavaScript', 'ComputerScience'].map(language => (
              <div className="dropdown" key={language}>
                <button className="dropdown-button" onClick={() => toggleDropdown(language)}>
                  {language} Language
                </button>
                {isDropdownOpen[language] && (
                  <div className="dropdown-content">
                    <p>
                      {getLanguageDescription(language)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Function to return the appropriate language description
const getLanguageDescription = (language) => {
  switch (language) {
    case 'C':
      return (
        <span>
          C is a powerful general-purpose programming language. It is widely used for system programming, embedded systems, and application development. 
          <a className="w3school" href="https://www.w3schools.com/c/" target="_blank" rel="noopener noreferrer"> Learn more at W3Schools.</a>
        </span>
      );
    case 'Python':
      return (
        <span>
          Python is a versatile programming language known for its readability and simplicity. It is widely used in web development, data analysis, and artificial intelligence. 
          <a className="w3school" href="https://www.w3schools.com/python/" target="_blank" rel="noopener noreferrer"> Learn more at W3Schools.</a>
        </span>
      );
    case 'JavaScript':
      return (
        <span>
          JavaScript is a dynamic programming language primarily used for adding interactive behavior to web pages. It is also used in server-side programming with Node.js. 
          <a className="w3school" href="https://www.w3schools.com/js/" target="_blank" rel="noopener noreferrer"> Learn more at W3Schools.</a>
        </span>
      );
    case 'ComputerScience':
      return (
        <span>
          Computer Science is the study of algorithms, data structures, and the principles of computing. It encompasses various fields including programming, systems analysis, and software engineering. 
          <a className="w3school" href="https://teachyourselfcs.com/" target="_blank" rel="noopener noreferrer"> Learn more at Teach Yourself CS.</a>
        </span>
      );
    default:
      return "";
  }
};

export default Home;
