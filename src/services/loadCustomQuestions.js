import quizData from '../data/quizData.json';

export const loadCustomQuestions = (category) => {
  if (!quizData[category]) {
    throw new Error(`No custom questions found for category: ${category}`);
  }
  return quizData[category];
};
