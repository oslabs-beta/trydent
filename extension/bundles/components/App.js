import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ###TODO: useNavigate is not used in this file. Remove it?
import { Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import WelcomePage from './pages/WelcomePage';
import TestPage from './pages/TestPage';
import CodeBlock from './pages/CodeBlock';
const App = () => {
    return (_jsxs("div", { className: "router", children: [_jsx(TopBar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(WelcomePage, {}) }), _jsx(Route, { path: "/testPage", element: _jsx(TestPage, {}) }), _jsx(Route, { path: "/codeBlock", element: _jsx(CodeBlock, {}) })] })] }));
};
export default App;
