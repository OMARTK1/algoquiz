import React from 'react';

const Continue = ({ onContinue }) => {
  return (
    <button onClick={onContinue}><i className="fas fa-arrow-right icon"></i>Continue</button>
  );
};

export default Continue;