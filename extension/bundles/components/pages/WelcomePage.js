import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
const WelcomePage = () => {
    const navigate = useNavigate();
    const handleClick = (event) => {
        event.preventDefault();
        handleSendDescribe();
        // console.log(event.target[0].value);
        // setTestDescribe(event.target[0].value);
        navigate('/testPage');
    };
    // dispatch a custom event describeStatement to so we can assign our describeObj.description's value
    const handleSendDescribe = () => {
        // create and dispatch custom startRecording event
        // Get the current value of the input field
        const describeStatementValue = document.querySelector('#describeStatement').value;
        // Create and dispatch the custom event, including the input field value as data
        const evt = new CustomEvent('describeStatement', { detail: { inputValue: describeStatementValue } });
        window.dispatchEvent(evt);
    };
    return (_jsxs("div", { className: "welcomePage", children: [_jsx("h1", { children: "New Test" }), _jsx("textarea", { id: "describeStatement", placeholder: "describe statement" }), _jsx("button", { id: "startTest", onClick: handleClick, children: "Start Test" }), _jsxs("details", { children: [_jsx("summary", { children: "Instructions" }), _jsxs("ol", { children: [_jsx("li", { children: "Enter your describe statement for your test!" }), _jsx("li", { children: "Once you are ready, \"Start Test\"" })] }), _jsx("p", { children: "Remember, `describe` breaks your test suite into components. " }), _jsx("p", { children: "`it` statements further break down `describe` tests into smaller individual tests" })] })] }));
};
export default WelcomePage;
