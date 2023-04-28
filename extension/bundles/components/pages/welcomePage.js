import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
const WelcomePage = () => {
    // const [testDescribe, setTestDescribe] = useState('');
    const navigate = useNavigate();
    const handleClick = (event) => {
        event.preventDefault();
        // console.log(event.target[0].value);
        // setTestDescribe(event.target[0].value);
        navigate('/testPage');
    };
    return (_jsxs("div", { className: "welcomePage", children: [_jsx("p", { children: " I'm in welcomePage.tsx" }), _jsx("input", { type: "text", placeholder: "describe statement" }), _jsx("button", { onClick: handleClick, children: "Start Test" })] }));
};
export default WelcomePage;
