import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
/**
 * TopBar component that displays the logo and a button to create a new test.
 * When the button is clicked, the user is navigated to the root path.
 *
 * @component
 * @returns {ReactElement} The TopBar component
 */
const TopBar = () => {
    // Hook to navigate to different routes
    const navigate = useNavigate();
    /**
     * Handles the click event on the "New Test" button.
     * Navigates to the root path when the button is clicked.
     *
     * @param {React.MouseEvent<HTMLButtonElement>} event - The click event
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/');
    };
    return (_jsxs("div", { className: "topBar", children: [_jsx("div", { className: "topBar__logo", children: _jsx("h1", { children: "TRYDENT" }) }), _jsx("div", { className: "Title", children: _jsx("button", { onClick: handleSubmit, children: "New Test" }) })] }));
};
export default TopBar;
