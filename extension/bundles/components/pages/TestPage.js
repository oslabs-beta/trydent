import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
const TestPage = () => {
    const navigate = useNavigate();
    const handleClick = (event) => {
        event.preventDefault();
        navigate('/codeBlock');
    };
    return (_jsxs("div", { className: "testPage", children: [_jsx("h1", { children: "User Inputs" }), _jsx("input", { type: "text", placeholder: '"it" statement' }), _jsx("button", { children: "Start Recording" }), _jsx("button", { onClick: handleClick, children: "Generate Test" }), _jsxs("details", { children: [_jsx("summary", { children: "Instructions" }), _jsxs("ol", { children: [_jsx("li", { children: "Enter your `it` statement" }), _jsx("li", { children: "Start recording" }), _jsx("li", { children: "Perform actions on the page" }), _jsx("li", { children: "When you are ready, \"Generate Test\"" })] }), _jsx("p", { children: "Remember, `describe` breaks your test suite into components. " }), _jsx("p", { children: "`it` statements further break down `describe` tests into smaller individual tests" })] })] }));
};
export default TestPage;
