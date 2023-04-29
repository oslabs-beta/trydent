import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
const TopBar = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target[0].value);
        // setTestDescribe(event.target[0].value);
        navigate('/');
    };
    return (_jsxs("div", { className: "topBar", children: [_jsx("div", { className: "topBar__logo", children: _jsx("h1", { children: "TRYDENT" }) }), _jsx("div", { className: "Title", children: _jsx("button", { onClick: handleSubmit, children: "New Test" }) })] }));
};
export default TopBar;
