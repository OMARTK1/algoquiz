import React from 'react';

const Continue = ({ selectedCategory, selectedLevel, navigate }) => {
  const categories = ["C", "Python", "JavaScript", "Computer Science"]; // Added Computer Science
  const levels = ["easy", "intermediate", "advanced"];

  // Function to handle Continue button logic
  const handleContinue = () => {
    const currentCategoryIndex = categories.indexOf(selectedCategory);
    const currentLevelIndex = levels.indexOf(selectedLevel);

    if (currentLevelIndex < levels.length - 1) {
      // If not the last level, move to the next level in the same category
      const nextLevel = levels[currentLevelIndex + 1];
      navigate(`/quiz`, { state: { category: selectedCategory, level: nextLevel } });
    } else if (currentCategoryIndex < categories.length - 1) {
      // If the last level in the category, move to the first level in the next category
      const nextCategory = categories[currentCategoryIndex + 1];
      navigate(`/quiz`, { state: { category: nextCategory, level: "easy" } });
    }
  };

  // Logic to determine if the Continue button should be shown
  const shouldShowContinue = !(selectedCategory === categories[categories.length - 1] && selectedLevel === levels[levels.length - 1]);

  return shouldShowContinue ? (
    <button onClick={handleContinue}>Continue</button>
  ) : null;
};

export default Continue;
