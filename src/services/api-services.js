const fetchQuestions = async (difficulty) => {
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}&type=multiple`);
      
      if (response.status === 429) {
        console.warn(`Rate limit exceeded. Retrying in 1 second... (Attempt ${attempt})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }

      if (!response.ok) {
        throw new Error(`Network error: ${response.statusText}`);
      }

      const data = await response.json();

      return data.results.map(item => ({
        question: item.question,
        options: [...item.incorrect_answers, item.correct_answer].sort(),
        correct_answer: item.correct_answer,
      }));

    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${error}`);
      if (attempt === maxAttempts) {
        throw new Error(`Failed after ${maxAttempts} attempts: ${error.message}`);
      }
    }
  }
};
