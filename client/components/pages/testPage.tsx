import React from 'react';
import EventLogger from '../EventLogger';

const TestPage: React.FC = () => {
    return(
        <div className="testPage">
            <h1>User Inputs</h1>
            <input type="text" />
            <button>Start Test</button>
            <ol>
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