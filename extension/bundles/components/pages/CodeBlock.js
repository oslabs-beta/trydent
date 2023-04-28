import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { sampleTextFormatted } from '../../utils/testCreator';
const CodeBlock = () => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        const textArea = document.createElement('textarea');
        textArea.value = sampleTextFormatted;
        document.body.appendChild(textArea);
        textArea.select();
        navigator.clipboard.writeText(sampleTextFormatted);
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };
    return (_jsxs("div", { className: "codeBlock", children: [_jsx("h1", { children: "Generated Test" }), _jsxs("pre", { children: [_jsx("button", { onClick: handleCopy, disabled: copied, className: copied ? 'copied' : '', children: copied ? 'Copied to clipboard!' : 'Copy' }), _jsx("code", { id: "codeBlock", children: sampleTextFormatted })] }), _jsxs("p", { children: ["Thank you for supporting TRYDENT. If you enjoyed, please give our ", _jsx("a", { href: "https://github.com/oslabs-beta/trydent", target: "_blank", children: "Github" }), " a star!"] })] }));
};
export default CodeBlock;
