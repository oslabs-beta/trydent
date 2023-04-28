import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CodeBlock from './pages/CodeBlock';
import TopBar from './topBar';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcomePage';
import TestPage from './pages/testPage';
const App = () => {
    return (_jsxs("div", { className: 'router', children: [_jsx("div", { children: "This is my App.tsx" }), _jsx(TopBar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(WelcomePage, {}) }), _jsx(Route, { path: "/testPage", element: _jsx(TestPage, {}) }), _jsx(Route, { path: "/codeBlock", element: _jsx(CodeBlock, {}) })] })] }));
};
export default App;
