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
// ###TODO: delete once page events are properly implemented
// changed to be poorly formatted, proving that prettier works
// let sampleText = `//High level description on how the button should be clicked
// describe("click on the thing", () => {
//         beforeEach(() => {
//     cy.visit("localhost:3000");
//     cy.window().should("have.property", "appReady", true);
// });
//   it("should be a click3", () => {
//     cy.xpath('[".XPATH"]').click();
//         cy.url().should("include", "/user/login");
//       cy.xpath('[".XPATH"]').input("typed into the box");
//   });
//   it("should be a input4", () => {
//     cy.xpath('[".XPATH"]').click()
//     cy.url().should("include", "/user/login")
//     cy.xpath('[".XPATH"]').input("typed into the box");
//   });
// });`;
let sampleText = '';
let sampleTextFormatted = '';
// LETS TRY TO MAKE A STATE VAR THAT IS RE RENDERED WHENEVER THE STATE CHANGES 
// THAT WOULD MOST LIKELY BE SAMPLETEXTFORMATED
window.addEventListener('message', (event) => {
    if (event.data.type === 'GENERATED_CODE') {
        console.log("EVENT - gen code TSX: ", event);
        sampleText = event.data.code;
        console.log(sampleText);
        sampleTextFormatted = prettierFormat(sampleText);
    }
});
console.log('sampleTextFormatted: ', sampleTextFormatted);
// let sampleTextFormatted;
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
                console.log('EVENT - gen code TSX: ', event);
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
    return (_jsxs("div", { className: "codeBlock", children: [_jsx("h1", { children: "Generated Test" }), _jsxs("pre", { children: [_jsx("button", { onClick: handleCopy, disabled: copied, className: copied ? 'copied' : '', children: copied ? 'Copied to clipboard!' : 'Copy' }), _jsx(SyntaxHighlighter, { language: "javascript", style: oneDark, customStyle: { background: '#1A1A1A' }, codeTagProps: { style: { background: '#1A1A1A' } }, wrapLines: true, lineProps: { style: { paddingRight: '1em' } }, children: formattedText ? formattedText : sampleText })] }), _jsxs("p", { children: ["Thank you for supporting TRYDENT. If you enjoyed, please give our", ' ', _jsx("a", { href: "https://github.com/oslabs-beta/trydent", target: "_blank", children: "Github" }), ' ', "a star!"] }), _jsx(GitHubButton, { href: "https://github.com/oslabs-beta/trydent", "data-icon": "octicon-star", "aria-label": "Star oslabs-beta/trydent on GitHub", children: "Star" })] }));
};
export default CodeBlock;
