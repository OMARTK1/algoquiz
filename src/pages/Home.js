import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Background from '../components/Background';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Lottie from 'lottie-react';
import homeAnimation from '../assets/animations/Animation - Home_quote.json';
import loadingAnimation from '../assets/animations/Animation - Loading.json';
import '../styles/Home.css';

const Home = () => {
  const [isDropdownOpen, setDropdownOpen] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
        <Lottie animationData={loadingAnimation} loop={true} />
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
            <Lottie animationData={homeAnimation} loop={true} />
          </div>

          <p>Ready to sharpen your coding skills and master algorithms? AlgoQuiz is designed to test and enhance your understanding of algorithms and data structures, a crucial part of any developer's toolkit. Whether you’re a beginner or a seasoned programmer, AlgoQuiz offers engaging and challenging quizzes that cover essential topics.</p>
          <p>For more coding tutorials and resources, check out <a className="w3school" href="https://www.w3schools.com/" target="_blank" rel="noopener noreferrer">W3Schools</a>.</p>
          <Link className="quiz-link" to="/quiz">Start Quiz</Link>
          <div className="dropdowns">
            <div className="dropdown">
              <button className="dropdown-button" onClick={() => toggleDropdown('C')}>
                C Language
              </button>
              {isDropdownOpen['C'] && (
                <div className="dropdown-content">
                  <p>C is a powerful general-purpose programming language. It is widely used for system programming, embedded systems, and application development. <a className="w3school" href="https://www.w3schools.com/c/" target="_blank" rel="noopener noreferrer">Learn more</a>.</p>
                </div>
              )}
            </div>
            <div className="dropdown">
              <button className="dropdown-button" onClick={() => toggleDropdown('Python')}>
                Python Language
              </button>
              {isDropdownOpen['Python'] && (
                <div className="dropdown-content">
                  <p>Python is a versatile programming language known for its readability and simplicity. It is widely used in web development, data analysis, and artificial intelligence. <a className="w3school" href="https://www.w3schools.com/python/" target="_blank" rel="noopener noreferrer">Learn more</a>.</p>
                </div>
              )}
            </div>
            <div className="dropdown">
              <button className="dropdown-button" onClick={() => toggleDropdown('JavaScript')}>
                JavaScript Language
              </button>
              {isDropdownOpen['JavaScript'] && (
                <div className="dropdown-content">
                  <p>JavaScript is a dynamic programming language primarily used for adding interactive behavior to web pages. It is also used in server-side programming with Node.js. <a className="w3school" href="https://www.w3schools.com/js/" target="_blank" rel="noopener noreferrer">Learn more</a>.</p>
                </div>
              )}
            </div>
            <div className="dropdown">
              <button className="dropdown-button" onClick={() => toggleDropdown('ComputerScience')}>
                Computer Science
              </button>
              {isDropdownOpen['ComputerScience'] && (
                <div className="dropdown-content">
                  <p>Computer Science is the study of algorithms, data structures, and the principles of computing. It encompasses various fields including programming, systems analysis, and software engineering.  <a className="w3school" href="https://teachyourselfcs.com/" target="_blank" rel="noopener noreferrer">Learn more</a>.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;