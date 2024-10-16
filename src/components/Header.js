import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>AlgoQuiz</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/quiz">Quiz</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;