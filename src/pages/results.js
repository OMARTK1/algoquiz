import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { score, total } = location.state; // Destructure score and total from location state

  return (
    <div>
      <Header />
      <main>
        <h1>Quiz Results</h1>
        <p>Your score is: {score} out of {total}</p>
        <p>You have completed the quiz</p>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
