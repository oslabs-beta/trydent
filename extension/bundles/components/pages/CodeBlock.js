import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react'; // ###TODO: useEffect is never used. Remove it?
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import GitHubButton from 'react-github-btn';
/**
 * formats the input string using prettier
 * @param input - string to be formatted
 * @returns {string} - formatted string
 */
const prettierFormat = (input) => {
    return prettier.format(input, {
        parser: 'babel',
        plugins: [parserBabel],
    });
};
// // RENAME THESE VARIABLES 
// let sampleText = ''
// let sampleTextFormatted = '';
// // Event listener for the message being sent from devtool.js that includes the string generatedCode
// // Invoke prettierFormat function with generated code
// window.addEventListener('message', (event) => {
//   if (event.data.type === 'GENERATED_CODE') {
//     console.log("EVENT - gen code TSX: ", event)
//     sampleText = event.data.code;
//     sampleTextFormatted = prettierFormat(sampleText);
//   }
// });
/**
 * Displays the generated code and provides functionality of copying to clipboard
 *
 * @component
 * @returns {ReactElement} - JSX code for rendering the component
 */
const CodeBlock = () => {
    const [copied, setCopied] = useState(false);
    const [formattedText, setFormattedText] = useState('');
    const handleCopy = async () => {
        const textArea = document.createElement('textarea');
        textArea.value = formattedText;
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            await navigator.clipboard.writeText(formattedText);
            setCopied(true);
        }
        catch (err) {
            console.log('Unable to copy text', err);
        }
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };
    useEffect(() => {
        const handleMessageEvent = (event) => {
            if (event.data.type === 'GENERATED_CODE') {
                const inputText = event.data.code;
                console.log(inputText);
                const formatted = prettierFormat(inputText);
                setFormattedText(formatted);
            }
        };
        window.addEventListener('message', handleMessageEvent);
        return () => {
            window.removeEventListener('message', handleMessageEvent);
        };
    }, []);
    return (_jsxs("div", { className: "codeBlock", children: [_jsx("h1", { children: "Generated Test" }), _jsxs("pre", { children: [_jsx("button", { onClick: handleCopy, disabled: copied, className: copied ? 'copied' : '', children: copied ? 'Copied to clipboard!' : 'Copy' }), _jsx(SyntaxHighlighter, { language: "javascript", style: oneDark, customStyle: { background: '#1A1A1A' }, codeTagProps: { style: { background: '#1A1A1A' } }, wrapLines: true, lineProps: { style: { paddingRight: '1em' } }, children: formattedText ? formattedText : '' })] }), _jsxs("p", { children: ["Thank you for supporting TRYDENT. If you enjoyed, please give our", ' ', _jsx("a", { href: "https://github.com/oslabs-beta/trydent", target: "_blank", children: "Github" }), ' ', "a star!"] }), _jsx(GitHubButton, { href: "https://github.com/oslabs-beta/trydent", "data-icon": "octicon-star", "aria-label": "Star oslabs-beta/trydent on GitHub", children: "Star" })] }));
};
export default CodeBlock;
