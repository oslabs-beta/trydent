import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CodeBlock from './CodeBlock';
import EventLogger from './EventLogger';
const App = () => {
    return (_jsxs("div", { children: [_jsx("h1", { children: "Logged Events" }), _jsx("p", { children: "Pain" }), _jsx("h3", { children: "Code Block" }), _jsx(CodeBlock, {}), _jsx(EventLogger, {})] }));
};
export default App;
