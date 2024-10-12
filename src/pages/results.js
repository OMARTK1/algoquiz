import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import AnswersReview from "../components/AnswersReview"; // Import AnswersReview component

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { score, total, questions, answers } = location.state; // Get questions and answers passed from the Quiz
  const [showAnswers, setShowAnswers] = useState(false); // State to show/hide answers

  const handleViewAnswers = () => {
    setShowAnswers(true); // Show answers when user clicks the button
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Quiz Results</h1>
        <p>Your score is: {score} out of {total}</p>
        <p>You have completed the quiz</p>

        <button onClick={handleViewAnswers}>View Answers</button> {/* Button to show answers */}       
        {/* Add Back to Home Button */}
        <button onClick={() => navigate('/')}>Back to Home</button> {/* Navigate back to Home */}

        {/* Conditionally render the AnswersReview component based on showAnswers state */}
        {showAnswers && (
          <AnswersReview questions={questions} answers={answers} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Results;
