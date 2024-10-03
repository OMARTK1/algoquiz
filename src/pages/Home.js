// src/pages/Home.js
import React, { useEffect } from 'react'; // Import useEffect
import { Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  useEffect(() => {
    console.log("HMR test"); // This will log when the component mounts or updates
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to AlgoQuiz!</h2>
        <p>Test your knowledge of algorithms and data structures.</p>
        <p>Click on the Quiz link in the navigation to get started.</p>
        <Link to="/quiz">Quiz</Link>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
