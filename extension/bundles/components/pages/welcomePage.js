import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const WelcomePage = () => {
    const [testDescribe, setTestDescribe] = useState('');
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(event.target[0].value);
    // }
    return (_jsxs("div", { className: "welcomePage", children: [_jsx("h1", { children: "Welcome to Trydent!" }), _jsx("p", { children: "Cypress is a popular end-to-end testing framework that enables developers to test their web applications thoroughly. It provides a powerful set of features that allow you to write tests in a simple, yet effective way. However, writing tests can be a time-consuming process, and it's important to have the right tools to make the process more efficient." }), _jsx("p", { children: "Trydent is a tool that helps you write Cypress tests faster by providing a visual interface for recording user actions on your web application." }), _jsx("p", { children: "From these actions, tests will be automatically created to be quickly copied into your code!" }), _jsx("h3", { children: "Enter a description for a new testing suite" })] }));
};
export default WelcomePage;
