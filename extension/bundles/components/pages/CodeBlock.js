import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { sampleTextFormatted } from '../../utils/testCreator';
/**
 * CodeBlock component displays the generated test code and provides functionality to copy to clipboard
 *
 * @component
 * @returns {ReactElement} JSX code for rendering the component
 */
const CodeBlock = () => {
    // State to track if code has been copied to clipboard
    const [copied, setCopied] = useState(false);
    /**
     * handleCopy function copies sampleTextFormatted to clipboard
     * Also updates copied status and resets it after 2 seconds
     *
     * @async
     * @function
     */
    const handleCopy = async () => {
        // creates temporary textarea element. setting the value to sample text and appending to body
        const textArea = document.createElement('textarea');
        textArea.value = sampleTextFormatted;
        // Set CSS properties to make the textarea invisible
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        // selects the text in the text area
        textArea.select();
        try {
            // try to copy selected content to the clipboard
            document.execCommand('copy');
            setCopied(true);
        }
        catch (err) {
            console.log('Unable to copy text', err);
        }
        // remove textarea from document body after 2 seconds and reset copied status
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };
    return (_jsxs("div", { className: "codeBlock", children: [_jsx("h1", { children: "Generated Test" }), _jsxs("pre", { children: [_jsx("button", { onClick: handleCopy, disabled: copied, className: copied ? 'copied' : '', children: copied ? 'Copied to clipboard!' : 'Copy' }), _jsx("code", { id: "codeBlock", children: sampleTextFormatted })] }), _jsxs("p", { children: ["Thank you for supporting TRYDENT. If you enjoyed, please give our ", _jsx("a", { href: "https://github.com/oslabs-beta/trydent", target: "_blank", children: "Github" }), " a star!"] })] }));
};
export default CodeBlock;
