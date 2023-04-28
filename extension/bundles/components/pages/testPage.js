import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
const TestPage = () => {
    const navigate = useNavigate();
    const handleClick = (event) => {
        event.preventDefault();
        navigate('/codeBlock');
    };
    return (_jsxs("div", { className: "testPage", children: [_jsx("h1", { children: "User Inputs" }), _jsx("input", { type: "text" }), _jsx("button", { onClick: handleClick, children: "Start Test" }), _jsxs("ol", { children: [_jsx("li", { children: "Enter a description for a new test" }), _jsx("li", { children: "Start recording" }), _jsx("li", { children: "Perform actions on the page" }), _jsx("li", { children: "Stop recording" }), _jsx("li", { children: "Save test" })] })] }));
};
export default TestPage;
