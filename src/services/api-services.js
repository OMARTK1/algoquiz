const fetchQuestions = async (difficulty) => {
  let attempt = 0;
  const maxAttempts = 3; // Maximum number of attempts
  while (attempt < maxAttempts) {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}&type=multiple`);
      if (!response.ok) {
        if (response.status === 429) {
          // Handle rate limiting (optional: add a delay before retry)
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        } else {
          throw new Error('Network response was not ok');
        }
      }
      const data = await response.json();

      // Format the data to match the quizData structure
      const formattedQuestions = data.results.map((item) => ({
        question: item.question,
        options: [...item.incorrect_answers, item.correct_answer].sort(),
        correct_answer: item.correct_answer,
      }));

      return formattedQuestions;
    } catch (error) {
      console.error(`Attempt ${attempt + 1}: ${error}`);
      attempt += 1;
      if (attempt === maxAttempts) {
        throw error; // Re-throw the last error if max attempts reached
      }
    }
  }
};
