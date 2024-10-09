import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import quizData from '../data/quizData.json'; // Keeping this for custom data
import Timer from '../components/Timer'; // Importing Timer component

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeUp, setTimeUp] = useState(false); // State for when the time is up
  const [timerDuration, setTimerDuration] = useState(0); // Duration for the timer in minutes
  const navigate = useNavigate();

  const categories = quizData ? Object.keys(quizData).concat("Computer Science") : [];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedLevel(null);
    setSubmitted(false);
    setScore(0);
    setTimerDuration(0); // Reset timer duration when category is selected
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setSubmitted(false);
    setScore(0);
    
    // Set timer duration (in minutes)
    if (level === "easy") {
      setTimerDuration(5); // 5 minute
    } else if (level === "intermediate") {
      setTimerDuration(5); // 5 minutes
    } else if (level === "advanced") {
      setTimerDuration(5); // 5 minutes
    }
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      if (selectedCategory && selectedLevel) {
        setLoading(true);

        if (["C", "Python", "JavaScript"].includes(selectedCategory)) {
          const customQuestions = quizData[selectedCategory][selectedLevel];
          setQuestions(customQuestions);
          setAnswers({}); // Reset answers
        } else if (selectedCategory === "Computer Science") {
          const difficulty = selectedLevel === "easy" ? "easy" : selectedLevel === "intermediate" ? "medium" : "hard";
          try {
            const apiQuestions = await fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}`);
            const data = await apiQuestions.json();
            if (data.results && data.results.length > 0) {
              setQuestions(data.results.map((question) => ({
                question: question.question,
                options: [...question.incorrect_answers, question.correct_answer].sort(), // Shuffle options
                correct_answer: question.correct_answer,
              })));
              setAnswers({}); // Reset answers
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
    setSubmitted(true);
    
    navigate('/results', { state: { score: newScore, total: questions.length } });
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
              {selectedCategory === "Computer Science" ? (
                <>
                  <li>
                    <button onClick={() => handleLevelSelect("easy")}>Easy</button>
                  </li>
                  <li>
                    <button onClick={() => handleLevelSelect("intermediate")}>Intermediate</button>
                  </li>
                  <li>
                    <button onClick={() => handleLevelSelect("advanced")}>Advanced</button>
                  </li>
                </>
              ) : (
                Object.keys(quizData[selectedCategory]).map((level) => (
                  <li key={level}>
                    <button onClick={() => handleLevelSelect(level)}>
                      {level}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : (
          <div>
            <h3>{selectedCategory} - {selectedLevel} Quiz</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              questions.length > 0 ? (
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
                                  disabled={submitted || timeUp} // Disable if submitted or time is up
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
                    <button type="submit" disabled={timeUp}>Submit Answers</button> {/* Disable submit if time is up */}
                  </form>
                </>
              ) : (
                <p>No questions available. Please select a different category or level.</p>
              )
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
