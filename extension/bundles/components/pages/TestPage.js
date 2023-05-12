import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * The TestPage component renders a form for the user to enter
 * an 'it' statement for their test, start recording actions,
 * and generate the test code.
 *
 * @component
 * @returns {ReactElement} The TestPage component
 */
const TestPage = () => {
    const [isRecording, setIsRecording] = useState(false);
    const navigate = useNavigate();
    // Starts recording user actions and dispatches a custom 'startRecording' event
    const handleStartRecording = () => {
        setIsRecording(true);
        const itStatementValue = document.querySelector('#itStatement').value;
        const evt = new CustomEvent('startRecording', { detail: { inputValue: itStatementValue } });
        window.dispatchEvent(evt);
    };
    /**
     * Stops recording user actions, generates test code,
     * and navigates to the CodeBlock page.
     *
     * @param {React.MouseEvent<HTMLButtonElement>} event - The click event
     */
    const handleGenerate = (event) => {
        event.preventDefault();
        setIsRecording(false);
        const evt = new CustomEvent('stopRecording');
        window.dispatchEvent(evt);
        navigate('/codeBlock');
    };
    return (_jsxs("div", { className: "testPage", children: [_jsx("h1", { children: "User Inputs" }), _jsx("input", { id: "itStatement", type: "text", placeholder: '"it" statement' }), _jsx("button", { id: "startRecording", onClick: handleStartRecording, className: isRecording ? 'recording' : '', children: isRecording ? 'Recording in progress...' : 'Start Recording' }), _jsx("summary", { children: "Inputs Log:" }), _jsx("div", { className: "input-container", children: _jsx("ol", { className: "input-history" }) }), _jsx("button", { id: "generate", onClick: handleGenerate, children: "Stop Recording & Generate Test" }), _jsxs("details", { children: [_jsxs("div", { className: 'instructions', children: [_jsx("summary", { children: _jsx("h3", { children: "Instructions:" }) }), _jsxs("ol", { children: [_jsx("li", { children: "Enter your `it` statement" }), _jsx("li", { children: "Click 'Start Recording'" }), _jsx("li", { children: "Execute the user jounrey and we will capture the events" }), _jsx("li", { children: "When you are ready, \"Generate Test\"" }), _jsx("li", { children: "Now you're ready to copy your Cypress code, and paste it in your source code to run Cypress" })] })] }), _jsxs("div", { className: 'assertions', children: [_jsxs("p", { children: [_jsx("h3", { children: "Capturing assertions:" }), _jsx("br", {}), "Assertions enable you to validate scenarios such as whether an element is visible or has a particular attribute, CSS class, or state. "] }), _jsxs("ol", { children: [_jsx("li", { children: "Hover your mouse over the component you want to assert" }), _jsx("li", { children: "Keydown 'e'+'z'" }), _jsx("li", { children: "This will capture components on the page so cypress will check to see if the component exists when running your E2E test" }), _jsx("li", { children: "Look in the 'Inputs Log' to see your assertion target" })] })] })] })] }));
};
export default TestPage;
