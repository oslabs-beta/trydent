// ###TODO: useState is not being used, remove it?
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/testPage');
  };

  return (
    <div className="welcomePage">
      <h1>New Test</h1>
      <textarea placeholder="describe statement" />
      <button onClick={handleClick}>Start Test</button>
      <details>
        <summary>Instructions</summary>
        <ol>
          <li>Enter your describe statement for your test!</li>
          <li>Once you are ready, "Start Test"</li>
        </ol>
        <p>Remember, `describe` breaks your test suite into components. </p>
        <p>`it` statements further break down `describe` tests into smaller individual tests</p>
      </details>
    </div>
  );
};

export default WelcomePage;
