import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import quizData from '../data/quizData.json'; // Importing custom quiz data
import Timer from '../components/Timer'; // Importing Timer component
import Continue from '../components/Continue'; // Importing the Continue button component
import BackNavigation from '../components/BackNavigation'; // Import BackNavigation

const Quiz = () => {
  const location = useLocation(); // Get location to retrieve navigation state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timerDuration, setTimerDuration] = useState(5); // Set timer duration to 5 minutes
  const navigate = useNavigate();

  // Categories and levels
  const categories = quizData ? Object.keys(quizData).concat("Computer Science") : [];
  const levels = ["easy", "intermediate", "advanced"];

  // Fetch quiz data when category and level are selected
  const fetchQuizData = async () => {
    if (selectedCategory && selectedLevel) {
      setLoading(true);

      try {
        if (["C", "Python", "JavaScript"].includes(selectedCategory)) {
          const customQuestions = quizData[selectedCategory][selectedLevel];
          setQuestions(customQuestions);
          setAnswers({});
        } else if (selectedCategory === "Computer Science") {
          const difficulty = selectedLevel === "easy" ? "easy" : selectedLevel === "intermediate" ? "medium" : "hard";
          let attempts = 0;
          const maxAttempts = 5;

          while (attempts < maxAttempts) {
            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}`);
            if (response.ok) {
              const data = await response.json();
              if (data.results && data.results.length > 0) {
                setQuestions(data.results.map((question) => ({
                  question: question.question,
                  options: [...question.incorrect_answers, question.correct_answer].sort(),
                  correct_answer: question.correct_answer,
                })));
                setAnswers({});
                break; // Successful fetch, exit the loop
              } else {
                console.error('No questions found for Computer Science');
                setQuestions([]);
                break; // Exit loop if no questions
              }
            } else {
              if (response.status === 429) {
                console.error('Too many requests. Retrying...');
                attempts++;
                await new Promise(res => setTimeout(res, Math.pow(2, attempts) * 1000)); // Exponential backoff
              } else {
                throw new Error('Network response was not ok');
              }
            }
          }

          if (attempts === maxAttempts) {
            console.error('Failed to fetch questions after multiple attempts.');
            setQuestions([]); // Optionally clear questions
          }
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle setting category if coming back from retry (from the Results page)
  useEffect(() => {
    const quizState = location.state;
    if (quizState?.category) {
      setSelectedCategory(quizState.category); // Automatically set the category from the navigation state
      setSelectedLevel(quizState.level); // Automatically set the level from the navigation state
      setTimerDuration(5); // Set timer duration to 5 minutes
    }
  }, [location.state]);

  useEffect(() => {
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
    // Calculate score
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        newScore += 1;
      }
    });
    
    setScore(newScore);
    setSubmitted(true);
    
    // Navigate to results page with state
    navigate('/results', { 
      state: { 
        score: newScore, 
        total: questions.length, 
        questions, // Pass the questions here
        answers,   // Pass the answers here
        category: selectedCategory, 
        level: selectedLevel // Include the level here
      } 
    });
  };  

  return (
    <div>
      <Header />
      <main>
        <h2>Quiz Page</h2>
        
        {/* Include BackNavigation component */}
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
                  <button onClick={() => setSelectedCategory(category)}>
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
                  {levels.map((level) => (
                    <li key={level}>
                      <button onClick={() => setSelectedLevel(level)}>{level.charAt(0).toUpperCase() + level.slice(1)}</button>
                    </li>
                  ))}
                </>
              ) : (
                Object.keys(quizData[selectedCategory]).map((level) => (
                  <li key={level}>
                    <button onClick={() => setSelectedLevel(level)}>
                      {level}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : (
          <div>
            <h3>{selectedCategory} - {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Quiz</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              questions.length > 0 ? (
                <>
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
                                  id={`question-${index}-option-${optionIndex}`}
                                  value={option}
                                  onChange={() => handleAnswerChange(index, option)}
                                  disabled={submitted} // Disable if submitted
                                />
                                <label htmlFor={`question-${index}-option-${optionIndex}`}>
                                  {option}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                    <button type="submit" disabled={submitted}>Submit Answers</button>
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
