import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * The WelcomePage component renders a form for the user to enter
 * a describe statement for their test. It also provides basic
 * instructions for writing tests.
 *
 * @component
 * @returns {ReactElement} The WelcomePage component
 */
const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSendDescribe();
    navigate('/testPage');
  };

  /**
   * Dispatches a custom event 'describeStatement' to assign the value of describeObj.description.
   */
  const handleSendDescribe = () => {
    const describeStatementValue = (document.querySelector('#describeStatement') as HTMLInputElement).value;
    const evt = new CustomEvent('describeStatement', { detail: { inputValue: describeStatementValue } });
    window.dispatchEvent(evt);
  };

  return (
    <div className="welcomePage">
      <h1>New Test</h1>
      <textarea id="describeStatement" placeholder="describe statement" />
      <button id="startTest" onClick={handleClick}>
        Start Test
      </button>
      <details>
        <summary>Instructions</summary>
        <ol>
          <li>Enter your describe statement for your test!
            <ul>
              <li>Remember, `describe` breaks your test suite into components. </li>
              <li>`it` statements further break down `describe` tests into smaller individual tests</li>
            </ul>
          </li>
          <li>Once you are ready, "Start Test"</li>
          <li>Trydent won't start recording until you ask, so click 'Start Recording' on the next page when you're ready</li>
        </ol>
      </details>
    </div>
  );
};

export default WelcomePage;
