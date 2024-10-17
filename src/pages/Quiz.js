// src/pages/Quiz.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Background from '../components/Background';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/Animation - Loading.json';
import questionMarkAnimation from '../assets/animations/Animation - Question_mark.json';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Timer from '../components/Timer';
import quizData from '../data/quizData.json';
import BackNavigation from '../components/BackNavigation';
import '../styles/Quiz.css';

const Quiz = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || null);
  const [selectedLevel, setSelectedLevel] = useState(location.state?.level || null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [timerDuration] = useState(5);
  const [timeSpent, setTimeSpent] = useState(0);
  const [rateLimitError, setRateLimitError] = useState(false);
  const navigate = useNavigate();

  const categories = quizData ? Object.keys(quizData).concat("Computer Science") : [];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedLevel(null);
    setScore(0);
    setAnswers({});
    setRateLimitError(false);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setScore(0);
    setAnswers({});
    setRateLimitError(false);
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
            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}`);
            if (response.status === 429) {
              setRateLimitError(true);
              setLoading(false);
              return;
            }
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              const formattedQuestions = data.results.map((question) => ({
                question: question.question,
                options: [...question.incorrect_answers, question.correct_answer].sort(),
                correct_answer: question.correct_answer,
              }));
              setQuestions(formattedQuestions);
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

    const newResult = {
      category: selectedCategory,
      level: selectedLevel,
      score: newScore,
      total: questions.length,
      timeSpent: timeSpent,
    };

    const results = JSON.parse(localStorage.getItem('quizResults')) || [];
    const existingResultIndex = results.findIndex(result => 
      result.category === selectedCategory && result.level === selectedLevel
    );

    if (existingResultIndex > -1) {
      results[existingResultIndex] = newResult;
    } else {
      results.push(newResult);
    }
    localStorage.setItem('quizResults', JSON.stringify(results));

    const nextLevel = getNextLevel(selectedLevel);
    const nextCategory = !nextLevel ? getNextCategory(selectedCategory) : null;


    navigate('/results', {
      state: {
        score: newScore,
        total: questions.length,
        timeSpent: timeSpent,
        selectedCategory,
        selectedLevel,
        nextLevel,
        nextCategory,
        questions,
        answers,
      },
    });
  };

  const getNextLevel = (currentLevel) => {
    const levels = ["easy", "intermediate", "advanced"];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
  };

  const getNextCategory = (currentCategory) => {
    const categories = ["C", "Python", "JavaScript", "Computer Science"];
    const currentIndex = categories.indexOf(currentCategory);
    return currentIndex < categories.length - 1 ? categories[currentIndex + 1] : null;
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit();
  };

  return (
    <div>
      <Background />
      <Header />

      {loading ? (
        <div className="loading-container">
          <Lottie animationData={loadingAnimation} loop={true} />
          <p>Loading quiz...</p>
        </div>
      ) : (
        <main className="quiz-page">
          <div className="question-mark-animation">
            <Lottie animationData={questionMarkAnimation} loop={true} style={{ width: '80px', height: '80px' }} />
          </div>
          <h2>Let's Start!</h2>
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
          ) : questions.length > 0 ? (
            <>
              {rateLimitError && <p>Rate limit exceeded. Please try again later.</p>}
              <Timer duration={timerDuration} onTimeUp={handleTimeUp} setTimeSpent={setTimeSpent} />
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <ul>
                  {questions.map((question, index) => (
                    <li key={index} className="question-item">
                      <h3>{question.question}</h3>
                      <ul className="options-list">
                        {question.options.map((option, optionIndex) => (
                          <li
                            key={optionIndex}
                            className={`option-item ${answers[index] === option ? 'selected' : ''}`}
                            onClick={() => handleAnswerChange(index, option)}
                          >
                            <label>{option}</label>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                <button type="submit" disabled={timeUp}>Submit Answers</button>
              </form>
            </>
          ) : (
            <p>No questions available. Please select a different category or level.</p>
          )}
        </main>
      )}
      
      <Footer />
    </div>
  );
};

export default Quiz;
