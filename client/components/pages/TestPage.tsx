import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../scss/TestPage.module.scss';

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
    <div className={styles.testPage}>
      <h1>User Inputs</h1>
      <input id="itStatement" type="text" placeholder='"it" statement' />
      <button id="startRecording" onClick={handleStartRecording} className={isRecording ? styles.recording : ''}>
        {isRecording ? 'Recording in progress...' : 'Start Recording'}
      </button>
      <summary>Inputs Log:</summary>
      <div className={styles.inputContainer}>
        <ol className={styles.inputHistory}></ol>
      </div>
      <button className={styles.generate} onClick={handleGenerate}>
        Stop Recording & Generate Test
      </button>
      <details>
        <div className={styles.instructions}>
          <summary><h3>Instructions:</h3></summary>
          <ol>
            <li>Enter your `it` statement</li>
            <li>Click 'Start Recording'</li>
            <li>Execute the user jounrey and we will capture the events</li>
            <li>When you are ready, "Generate Test"</li>
            <li>Now you're ready to copy your Cypress code, and paste it in your source code to run Cypress</li>
         </ol>
        </div>
        <div className={styles.assertions}>
          <p><h3>Capturing assertions:</h3><br/>
            Assertions enable you to validate scenarios such as whether an element is visible or has a particular attribute, CSS class, or state. </p>
          <ol>
            <li>Hover your mouse over the component you want to assert</li>
            <li>Keydown 'e'+'z'</li>
            <li>This will capture components on the page so cypress will check to see if the component exists when running your E2E test</li>
            <li>Look in the 'Inputs Log' to see your assertion target</li>
          </ol>
        </div>
      </details>
    </div>
  );
};

export default TestPage;
