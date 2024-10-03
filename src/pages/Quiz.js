import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import quizData from '../data/quizData.json';

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate(); // Initialize navigate hook

  const categories = Object.keys(quizData);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedLevel(null);
    setSubmitted(false);
    setScore(0);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setSubmitted(false);
    setScore(0);
  };

  useEffect(() => {
    if (selectedCategory && selectedLevel) {
      setQuestions(quizData[selectedCategory][selectedLevel]);
      setAnswers({});
    }
  }, [selectedCategory, selectedLevel]);

  const handleAnswerChange = (questionIndex, option) => {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setSubmitted(true);
    
    // Navigate to results page with score and total questions
    navigate('/results', { state: { score: newScore, total: questions.length } });
  };

  return (
    <div>
      <Header />
      <main>
        <h2>Quiz Page</h2>
        {!selectedCategory ? (
          <div>
            <h3>Select a Category</h3>
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <button onClick={() => handleCategorySelect(category)}>
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : !selectedLevel ? (
          <div>
            <h3>Select a Level for {selectedCategory}</h3>
            <ul>
              {Object.keys(quizData[selectedCategory]).map((level) => (
                <li key={level}>
                  <button onClick={() => handleLevelSelect(level)}>
                    {level}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h3>{selectedCategory} - {selectedLevel} Quiz</h3>
            {questions.length > 0 ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <ul>
                  {questions.map((question, index) => (
                    <li key={index}>
                      <h3>{question.question}</h3>
                      <ul>
                        {question.options.map((option, optionIndex) => (
                          <li key={optionIndex}>
                            <input
                              type="radio"
                              name={`question-${index}`}
                              id={`correct_answer-${index}-${optionIndex}`}
                              value={option}
                              onChange={() => handleAnswerChange(index, option)}
                              disabled={submitted}
                            />
                            <label
                              htmlFor={`correct_answer-${index}-${optionIndex}`}
                              style={
                                submitted && option === question.correct_answer
                                  ? { color: 'green' }
                                  : {}
                              }
                            >
                              {option}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                <button type="submit">Submit Answers</button>
              </form>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
