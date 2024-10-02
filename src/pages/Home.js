// src/pages/Home.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to AlgoQuiz!</h2>
        <p>Test your knowledge of algorithms and data structures.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;