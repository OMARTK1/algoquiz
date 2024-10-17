import React from 'react';
import '../styles/AnswersReview.css';

const AnswersReview = ({ questions, answers }) => {
  console.log('Questions:', questions); // Debugging log
  console.log('Answers:', answers);      // Debugging log

  return (
    <div className="container">
      <h2 className="title">Review Your Answers</h2>
      <ul className="question-list">
        {questions.map((question, index) => (
          <li key={index} className="question-item">
            <h3 className="question">
              {index + 1}. {question.question}
            </h3>
            <ul className="option-list">
              {question.options.map((option, optionIndex) => (
                <li
                  key={optionIndex}
                  className={`option-item ${
                    option === question.correct_answer
                      ? 'green'
                      : answers[index] === option
                      ? 'red'
                      : 'black'
                  }`}
                >
                  {option}
                  {option === question.correct_answer && " (Correct Answer)"}
                  {answers[index] === option && option !== question.correct_answer && " (Your Answer)"}
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
