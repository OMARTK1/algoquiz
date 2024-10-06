import React, { useEffect, useState } from 'react';

const fetchQuestions = async (difficulty) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}&type=multiple`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  
  // Format the data to match the quizData structure
  const formattedQuestions = data.results.map((item) => ({
    question: item.question,
    options: [...item.incorrect_answers, item.correct_answer].sort(),
    correct_answer: item.correct_answer,
  }));
  
  return formattedQuestions;
};

export { fetchQuestions };
