import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * The TestPage component renders a form for the user to enter
 * an 'it' statement for their test, start recording actions,
 * and generate the test code.
 *
 * @component
 * @returns {ReactElement} The TestPage component
 */
const TestPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const navigate = useNavigate();

  // Starts recording user actions and dispatches a custom 'startRecording' event
  const handleStartRecording = () => {
    setIsRecording(true);
    const itStatementValue = (document.querySelector('#itStatement') as HTMLInputElement).value;
    const evt = new CustomEvent('startRecording', { detail: { inputValue: itStatementValue } });
    window.dispatchEvent(evt);
  };

  /**
   * Stops recording user actions, generates test code,
   * and navigates to the CodeBlock page.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event
   */
  const handleGenerate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsRecording(false);
    const evt = new CustomEvent('stopRecording');
    window.dispatchEvent(evt);
    navigate('/codeBlock');
  };
  return (
    <div className="testPage">
      <h1>User Inputs</h1>
      <input id="itStatement" type="text" placeholder='"it" statement' />
      <button id="startRecording" onClick={handleStartRecording} className={isRecording ? 'recording' : ''}>
        {isRecording ? 'Recording in progress...' : 'Start Recording'}
      </button>
      <summary>Inputs Log:</summary>
      <div className="input-container">
        <ol className="input-history"></ol>
      </div>
      <button id="generate" onClick={handleGenerate}>
        Stop Recording & Generate Test
      </button>
      <details>
        <summary>Instructions</summary>
        <ol>
          <li>Enter your `it` statement</li>
          <li>Start recording</li>
          <li>Perform actions on the page</li>
          <li>When you are ready, "Generate Test"</li>
        </ol>
        <p>Remember, `describe` breaks your test suite into components. </p>
        <p>`it` statements further break down `describe` tests into smaller individual tests</p>
      </details>
    </div>
  );
};

export default TestPage;
