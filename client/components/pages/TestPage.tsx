import React, { useState } from 'react';
import EventLogger from '../EventLogger'; // ###TODO: EventLogger is never used. Remove it?
import { useNavigate } from 'react-router-dom';

const TestPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const navigate = useNavigate();

  // dispatch a custom event startRecording to signal the start of recording
  const handleStartRecording = () => {
    setIsRecording(true);
    // create and dispatch custom startRecording event
    // Get the current value of the input field
    const itStatementValue = (document.querySelector('#itStatement') as HTMLInputElement).value;

    // Create and dispatch the custom startRecording event, including the input field value as data
    const evt = new CustomEvent('startRecording', { detail: { inputValue: itStatementValue } });
    window.dispatchEvent(evt);
  };

  // dispatch a custom event stopRecording to signal the stop of recording
  const handleStopRecording = () => {
    setIsRecording(false);
    // create and dispatch custom startRecording event
    const evt = new CustomEvent('stopRecording');
    window.dispatchEvent(evt);
  };

  const handleClick = (event) => {
    event.preventDefault();
    handleStopRecording();
    navigate('/codeBlock');
  };
  return (
    <div className="testPage">
      <h1>User Inputs</h1>
      <input id="itStatement" type="text" placeholder='"it" statement' />
      <button id="startRecording" onClick={handleStartRecording} className={isRecording ? 'recording' : ''}>
        {isRecording ? 'Recording in progress...' : 'Start Recording'}
      </button>
      <summary>Track your input here:</summary>
      <ol className="input-history"></ol>
      <button id="generate" onClick={handleClick}>
        Generate Test
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
