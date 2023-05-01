import React from 'react';
import EventLogger from '../EventLogger';
import { useNavigate } from 'react-router-dom'; 


const TestPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartRecording = () => {
    const evt = new CustomEvent("startRecording");
    window.dispatchEvent(evt);
  };
  const handleClick = (event) => {
      event.preventDefault();
      navigate('/codeBlock');
  }
    return(
        <div className="testPage">
            <h1>User Inputs</h1>
            <input type="text" placeholder='"it" statement' />
            <button id = "startRecording" onClick={handleStartRecording}>Start Recording</button>
            <button onClick={ handleClick }>Generate Test</button>
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
    )
}

export default TestPage;
