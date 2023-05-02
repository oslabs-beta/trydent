import React, { useState, useEffect } from 'react'; // ###TODO: useEffect is never used. Remove it?
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
const prettierFormat = (input: string): string => {
  return prettier.format(input, {
    parser: 'babel',
    plugins: [parserBabel],
  });
};

/**
 * Displays the generated code and provides functionality of copying to clipboard
 *
 * @component
 * @returns {ReactElement} - JSX code for rendering the component
 */
const CodeBlock: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formattedText, setFormattedText] = useState('');

  const handleCopy = async (): Promise<void> => {
    const textArea = document.createElement('textarea');
    textArea.value = formattedText;
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy')
      setCopied(true);
    } catch (err) {
      console.log('Unable to copy text', err);
    }

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const handleMessageEvent = (event: MessageEvent) => {
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

  return (
    <div className="codeBlock">
      <h1>Generated Test</h1>
      <pre>
        <button onClick={handleCopy} disabled={copied} className={copied ? 'copied' : ''}>
          {copied ? 'Copied to clipboard!' : 'Copy'}
        </button>
        <SyntaxHighlighter
          language="javascript"
          style={oneDark}
          customStyle={{ background: '#1A1A1A' }}
          codeTagProps={{ style: { background: '#1A1A1A' } }}
          wrapLines={true}
          lineProps={{ style: { paddingRight: '1em' } }}
        >
          {formattedText ? formattedText : ''}
        </SyntaxHighlighter>
      </pre>
      <p>
        Thank you for supporting TRYDENT. If you enjoyed, please give our{' '}
        <a href="https://github.com/oslabs-beta/trydent" target="_blank">
          Github
        </a>{' '}
        a star!
      </p>
      <GitHubButton
        href="https://github.com/oslabs-beta/trydent"
        data-icon="octicon-star"
        aria-label="Star oslabs-beta/trydent on GitHub"
      >
        Star
      </GitHubButton>
    </div>
  );
};


export default CodeBlock;
