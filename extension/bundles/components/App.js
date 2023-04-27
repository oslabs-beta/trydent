import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import EventLogger from './EventLogger';
import TopBar from './topBar';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcomePage';
import TestPage from './pages/testPage';
const App = () => {
    return (_jsxs("div", { className: 'router', children: [_jsx(EventLogger, {}), _jsx(TopBar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(WelcomePage, {}) }), _jsx(Route, { path: "/test", element: _jsx(TestPage, {}) })] })] }));
};
export default App;
