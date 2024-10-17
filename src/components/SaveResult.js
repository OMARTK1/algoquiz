// src/components/SaveResult.js
import React, { useEffect } from 'react';

const SaveResult = ({ score, total, timeSpent, selectedCategory, selectedLevel }) => {
  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('quizResults')) || [];
    
    // Create a new result object
    const newResult = {
      category: selectedCategory,
      level: selectedLevel,
      score: score,
      total: total,
      timeSpent: timeSpent,
    };

    // Check if result for this category and level already exists
    const existingResultIndex = results.findIndex(result => 
      result.category === selectedCategory && result.level === selectedLevel
    );

    if (existingResultIndex > -1) {
      // Update existing result
      results[existingResultIndex] = newResult;
    } else {
      // Save the new result to local storage
      results.push(newResult);
    }

    localStorage.setItem('quizResults', JSON.stringify(results));
  }, [score, total, timeSpent, selectedCategory, selectedLevel]);

  return null;
};

export default SaveResult;
