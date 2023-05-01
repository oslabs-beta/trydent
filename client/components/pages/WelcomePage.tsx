import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const WelcomePage: React.FC = () => {

    // const [testDescribe, setTestDescribe] = useState('');
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        handleSendDescribe()
        // console.log(event.target[0].value);
        // setTestDescribe(event.target[0].value);
        navigate('/testPage');
    }

  // dispatch a custom event describeStatement to so we can assign our describeObj.description's value 
  const handleSendDescribe = () => {
    // create and dispatch custom startRecording event
    // Get the current value of the input field
    const describeStatement = document.querySelector('#describeStatement');
    const describeStatementValue = describeStatement.value;

    // Create and dispatch the custom event, including the input field value as data
    const evt = new CustomEvent("describeStatement", { detail: { inputValue: describeStatementValue } });
    window.dispatchEvent(evt);
  };

    return(
      <div className="welcomePage">
        <h1>New Test</h1>
        <textarea id='describeStatement' placeholder="describe statement"/>	         
        <button id='startTest' onClick={handleClick}>Start Test</button>	          
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
    )
}

export default WelcomePage;
