import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Displays the logo and button to create new Test
 *
 * @component
 * @returns {ReactElement}
 */
const TopBar: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="topBar">
      <div className="topBar__logo">
        <h1>TRYDENT</h1>
      </div>
      <div className="Title">
        <button onClick={handleSubmit}>New Test</button>
      </div>
    </div>
  );
};

export default TopBar;
