import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Completed = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>You have completed all quizzes!</h2>
        <button onClick={() => window.location.reload()}>Retry</button>
      </main>
      <Footer />
    </div>
  );
};

export default Completed;
