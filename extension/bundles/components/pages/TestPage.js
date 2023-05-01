import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const TestPage = () => {
    const [isRecording, setIsRecording] = useState(false);
    const navigate = useNavigate();
    // dispatch a custom event startRecording to signal the start of recording
    const handleStartRecording = () => {
        setIsRecording(true);
        // create and dispatch custom startRecording event
        // Get the current value of the input field
        const itStatement = document.querySelector('#itStatement');
        const itStatementValue = itStatement.value;
        // Create and dispatch the custom stopRecording event, including the input field value as data
        const evt = new CustomEvent("startRecording", { detail: { inputValue: itStatementValue } });
        window.dispatchEvent(evt);
    };
    // dispatch a custom event startRecording to signal the stop of recording
    const handleStopRecording = () => {
        setIsRecording(false);
        // create and dispatch custom startRecording event
        const evt = new CustomEvent("stopRecording");
        window.dispatchEvent(evt);
    };
    const handleClick = (event) => {
        event.preventDefault();
        handleStopRecording();
        navigate('/codeBlock');
    };
    return (_jsxs("div", { className: "testPage", children: [_jsx("h1", { children: "User Inputs" }), _jsx("input", { id: "itStatement", type: "text", placeholder: '"it" statement' }), _jsx("button", { id: "startRecording", onClick: handleStartRecording, className: isRecording ? 'recording' : '', children: isRecording ? 'Recording in progress...' : 'Start Recording' }), _jsx("button", { id: 'generate', onClick: handleClick, children: "Generate Test" }), _jsxs("details", { children: [_jsx("summary", { children: "Instructions" }), _jsxs("ol", { children: [_jsx("li", { children: "Enter your `it` statement" }), _jsx("li", { children: "Start recording" }), _jsx("li", { children: "Perform actions on the page" }), _jsx("li", { children: "When you are ready, \"Generate Test\"" })] }), _jsx("p", { children: "Remember, `describe` breaks your test suite into components. " }), _jsx("p", { children: "`it` statements further break down `describe` tests into smaller individual tests" })] })] }));
};
export default TestPage;
