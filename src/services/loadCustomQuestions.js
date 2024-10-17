import quizData from '../data/quizData.json';

export const loadCustomQuestions = (category) => {
  const questions = quizData[category];
  if (!questions) {
    throw new Error(`No custom questions found for category: ${category}`);
  }
  return questions;
};
