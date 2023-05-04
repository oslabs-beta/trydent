import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * TopBar component that displays the logo and a button to create a new test.
 * When the button is clicked, the user is navigated to the root path.
 *
 * @component
 * @returns {ReactElement} The TopBar component
 */
const TopBar: React.FC = () => {
  // Hook to navigate to different routes
  const navigate = useNavigate();

  /**
   * Handles the click event on the "New Test" button.
   * Navigates to the root path when the button is clicked.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event
   */
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
