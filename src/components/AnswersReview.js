// src/components/AnswersReview.js
import React from 'react';

const AnswersReview = ({ questions, answers }) => {
  return (
    <div>
      <h2>Review Your Answers</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <h3>{question.question}</h3>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li
                  key={optionIndex}
                  style={{
                    color: option === question.correct_answer
                      ? 'green'
                      : answers[index] === option
                      ? 'red'
                      : 'black',
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnswersReview;
