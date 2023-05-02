import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
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
const prettierFormat = (input) => prettier.format(input, {
  parser: 'babel',
  plugins: [parserBabel],
});
/**
 * Displays the generated code and provides functionality of copying to clipboard
 *
 * @component
 * @returns {ReactElement} - JSX code for rendering the component
 */
const CodeBlock = () => {
  const [copied, setCopied] = useState(false);
  const [formattedText, setFormattedText] = useState('');
  // OLD CODE
  const handleCopy = async () => {
    const textArea = document.createElement('textarea');
    textArea.value = formattedText;
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
    } catch (err) {
      console.log('Unable to copy text', err);
    }
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
    // // NEW CODE
    // const handleCopy = async (): Promise<void> => {
    //   try {
    //     console.log('we got to the try case')
    //     await navigator.clipboard.writeText(formattedText);
    //     console.log(formattedText);
    //     setCopied(true);
    //   } catch (err) {
    //     console.log('Unable to copy text', err);
    //   }
    //   setTimeout(() => {
    //     setCopied(false);
    //   }, 20000);
    // };
    // NEW CODE 2.0
    // const handleCopy = async (): Promise<void> => {
    //   const iframe = document.createElement('iframe');
    //   iframe.style.display = 'none';
    //   document.body.appendChild(iframe);
    //   const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    //   try {
    //     await navigator.clipboard.writeText(formattedText);
    //     iframeDoc.write('<html><body><textarea id="copy-textarea">' + formattedText + '</textarea></body></html>');
    //     iframeDoc.querySelector('#copy-textarea').select();
    //     iframeDoc.execCommand('copy');
    //     setCopied(true);
    //   } catch (err) {
    //     console.log('Unable to copy text', err);
    //   } finally {
    //     setTimeout(() => {
    //       setCopied(false);
    //       document.body.removeChild(iframe);
    //     }, 200000);
    //   }
    // };
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
  return (_jsxs('div', {
    className: 'codeBlock',
    children: [_jsx('h1', { children: 'Generated Test' }), _jsxs('pre', {
      children: [_jsx('button', {
        onClick: handleCopy, disabled: copied, className: copied ? 'copied' : '', children: copied ? 'Copied to clipboard!' : 'Copy',
      }), _jsx(SyntaxHighlighter, {
        language: 'javascript', style: oneDark, customStyle: { background: '#1A1A1A' }, codeTagProps: { style: { background: '#1A1A1A' } }, wrapLines: true, lineProps: { style: { paddingRight: '1em' } }, children: formattedText || '',
      })],
    }), _jsxs('p', { children: ['Thank you for supporting TRYDENT. If you enjoyed, please give our', ' ', _jsx('a', { href: 'https://github.com/oslabs-beta/trydent', target: '_blank', children: 'Github' }), ' ', 'a star!'] }), _jsx(GitHubButton, {
      href: 'https://github.com/oslabs-beta/trydent', 'data-icon': 'octicon-star', 'aria-label': 'Star oslabs-beta/trydent on GitHub', children: 'Star',
    })],
  }));
};
export default CodeBlock;
