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
    return (_jsx("div", { children: _jsxs("pre", { children: [_jsx("code", { id: "codeBlock", children: sampleTextFormatted }), _jsx("button", { onClick: handleCopy, disabled: copied, children: copied ? 'Copied!' : 'Copy' })] }) }));
};
export default CodeBlock;
