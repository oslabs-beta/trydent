import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
/**
 * The WelcomePage component renders a form for the user to enter
 * a describe statement for their test. It also provides basic
 * instructions for writing tests.
 *
 * @component
 * @returns {ReactElement} The WelcomePage component
 */
const WelcomePage = () => {
    const navigate = useNavigate();
    const handleClick = (event) => {
        event.preventDefault();
        handleSendDescribe();
        navigate('/testPage');
    };
    /**
     * Dispatches a custom event 'describeStatement' to assign the value of describeObj.description.
     */
    const handleSendDescribe = () => {
        const describeStatementValue = document.querySelector('#describeStatement').value;
        const evt = new CustomEvent('describeStatement', { detail: { inputValue: describeStatementValue } });
        window.dispatchEvent(evt);
    };
    return (_jsxs("div", { className: "welcomePage", children: [_jsx("h1", { children: "New Test" }), _jsx("textarea", { id: "describeStatement", placeholder: "describe statement" }), _jsx("button", { id: "startTest", onClick: handleClick, children: "Start Test" }), _jsxs("details", { children: [_jsx("summary", { children: "Instructions" }), _jsxs("ol", { children: [_jsxs("li", { children: ["Enter your describe statement for your test!", _jsxs("ul", { children: [_jsx("li", { children: "Remember, `describe` breaks your test suite into components. " }), _jsx("li", { children: "`it` statements further break down `describe` tests into smaller individual tests" })] })] }), _jsx("li", { children: "Once you are ready, \"Start Test\"" }), _jsx("li", { children: "Trydent won't start recording until you ask, so click 'Start Recording' on the next page when you're ready" })] })] })] }));
};
export default WelcomePage;
