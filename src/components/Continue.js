import React from 'react';
import '../styles/Continue.css';

const Continue = React.memo(({ onContinue }) => {
  return (
    <button onClick={onContinue}><i className="fas fa-arrow-right icon"></i>Continue</button>
  );
});

export default Continue;
