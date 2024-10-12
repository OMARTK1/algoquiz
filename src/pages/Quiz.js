// src/pages/Quiz.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Timer from '../components/Timer';
import quizData from '../data/quizData.json';
import BackNavigation from '../components/BackNavigation'; // Import BackNavigation

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [timerDuration, setTimerDuration] = useState(5);
  const navigate = useNavigate();

  const categories = quizData ? Object.keys(quizData).concat("Computer Science") : [];

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
    const fetchQuizData = async () => {
      if (selectedCategory && selectedLevel) {
        setLoading(true);

        if (["C", "Python", "JavaScript"].includes(selectedCategory)) {
          const customQuestions = quizData[selectedCategory][selectedLevel];
          setQuestions(customQuestions);
          setAnswers({});
        } else if (selectedCategory === "Computer Science") {
          const difficulty = selectedLevel === "easy" ? "easy" : selectedLevel === "intermediate" ? "medium" : "hard";
          try {
            const apiQuestions = await fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}`);
            const data = await apiQuestions.json();
            if (data.results && data.results.length > 0) {
              setQuestions(data.results.map((question) => ({
                question: question.question,
                options: [...question.incorrect_answers, question.correct_answer].sort(),
                correct_answer: question.correct_answer,
              })));
              setAnswers({});
            } else {
              console.error('No questions found for Computer Science');
              setQuestions([]);
            }
          } catch (error) {
            console.error('Error fetching questions:', error);
          }
        }
        setLoading(false);
      }
    };

    fetchQuizData();
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
    
    // Navigate to Results page and pass data
    navigate('/results', {
      state: {
        score: newScore,
        total: questions.length,
        questions,
        answers,
      },
    });
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit(); // Automatically submit the quiz when time is up
  };

  return (
    <div>
      <Header />
      <main>
        <h2>Quiz Page</h2>
        
        {/* Use BackNavigation here to provide navigation options */}
        <BackNavigation
          resetCategory={selectedCategory && !selectedLevel ? () => setSelectedCategory(null) : null}
          resetLevel={selectedCategory && selectedLevel ? () => setSelectedLevel(null) : null}
        />

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
              {["easy", "intermediate", "advanced"].map((level) => (
                <li key={level}>
                  <button onClick={() => handleLevelSelect(level)}>
                    {level}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            {loading ? (
              <p>Loading...</p>
            ) : questions.length > 0 ? (
              <>
                <Timer duration={timerDuration} onTimeUp={handleTimeUp} /> {/* Timer Component */}
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
                              />
                              <label htmlFor={`correct_answer-${index}-${optionIndex}`}>
                                {option}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                  <button type="submit" disabled={timeUp}>Submit Answers</button> {/* Disable submit if time is up */}
                </form>
              </>
            ) : (
              <p>No questions available. Please select a different category or level.</p>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
