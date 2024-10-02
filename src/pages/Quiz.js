// src/pages/Quiz.js
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import quizData from "../data/quizData.json"; // Change to default import

const Quiz = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Assuming you want to access the "C" questions
    setQuestions(quizData.C.easy); // Adjust this line to access the questions
  }, []);

  return (
    <div>
      <Header />
      <main>
        <h2>Quiz Page</h2>
        {questions.length > 0 ? (
          <ul>
            {questions.map((question, index) => (
              <li key={index}> {/* Use index if there is no id */}
                <h3>{question.question}</h3>
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <input
                        type="radio"
                        name={`question-${index}`} // Use index for unique names
                        id={`answer-${optionIndex}`} // Use optionIndex for unique IDs
                      />
                      <label htmlFor={`answer-${optionIndex}`}>
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
