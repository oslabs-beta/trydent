import React from 'react';
import EventLogger from '../EventLogger';
import { useNavigate } from 'react-router-dom'; 


const TestPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (event) => {
      event.preventDefault();
      navigate('/codeBlock');
  }
    return(
        <div className="testPage">
            <h1>User Inputs</h1>
            <input type="text" />
            <button onClick={ handleClick }>Start Test</button>
            <ol></ol>
                <li>Enter a description for a new test</li>
                <li>Start recording</li>
                <li>Perform actions on the page</li>
                <li>Stop recording</li>
                <li>Save test</li>
            </ol>
        </div>
    )
}

export default TestPage;