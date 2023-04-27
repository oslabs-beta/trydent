import React from 'react';
import { useState } from 'react';

const WelcomePage: React.FC = () => {

    const [testDescribe, setTestDescribe] = useState('');

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(event.target[0].value);

    // }

    return(
        <div className="welcomePage">
            <h1>Welcome to Trydent!</h1>
            <p>Cypress is a popular end-to-end testing framework that enables developers to test their web applications thoroughly. It provides a powerful set of features that allow you to write tests in a simple, yet effective way. However, writing tests can be a time-consuming process, and it's important to have the right tools to make the process more efficient.</p>
            <p>Trydent is a tool that helps you write Cypress tests faster by providing a visual interface for recording user actions on your web application.</p>
            <p>From these actions, tests will be automatically created to be quickly copied into your code!</p>
            <h3>Enter a description for a new testing suite</h3>
            {/* <form onSubmit={handleSubmit}>
                <input type="text" />
                <button>Start Test</button>
            </form> */}
        </div>
    )
}

export default WelcomePage;