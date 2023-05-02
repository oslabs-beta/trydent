import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
/**
 * Displays the logo and button to create new Test
 *
 * @component
 * @returns {ReactElement}
 */
const TopBar = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/');
    };
    return (_jsxs("div", { className: "topBar", children: [_jsx("div", { className: "topBar__logo", children: _jsx("h1", { children: "TRYDENT" }) }), _jsx("div", { className: "Title", children: _jsx("button", { onClick: handleSubmit, children: "New Test" }) })] }));
};
export default TopBar;
