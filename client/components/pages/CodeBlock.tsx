import React, { useState, useEffect } from 'react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import GitHubButton from 'react-github-btn';
import styles from '../../scss/CodeBlock.module.scss';


/**
 * Formats the input string using prettier
 *
 * @param input - String to be formatted
 * @returns {string} - Formatted string
 */
const prettierFormat = (input: string): string => {
  return prettier.format(input, {
    parser: 'babel',
    plugins: [parserBabel],
  });
};

/**
 * The CodeBlock component displays the generated code and provides functionality for copying the code to the clipboard.
 *
 * @component
 * @returns {ReactElement} JSX code for rendering the component.
 */
const CodeBlock: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formattedText, setFormattedText] = useState('');

  // Copies the formatted text to the clipboard
  const handleCopy = async (): Promise<void> => {
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

  // Subscribe and unsubscribe from the 'message' event.
  useEffect(() => {
    const handleMessageEvent = (event: MessageEvent) => {
      if (event.data.type === 'GENERATED_CODE') {
        const inputText = event.data.code;
        // console.log(inputText);
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
    <div className={styles.codeBlock}>
      <div className={styles.head}>
        <h1>Generated Test</h1>
        <div className={styles.copyButton}>
          <button onClick={handleCopy} disabled={copied} className={copied ? styles.copied : ''}>
            {copied ? 'Copied to clipboard!' : 'Copy'}
          </button>
        </div>
      </div>
      <div className={styles.code}>
        {/* <SyntaxHighlighter
          language="javascript"
          style={oneDark}
          customStyle={{ background: '#1A1A1A' }}
          codeTagProps={{ style: { background: '#1A1A1A' } }}
          wrapLines={true}
          lineProps={{ style: { paddingRight: '1em' } }}
        >
          {formattedText ? formattedText : ''}
        </SyntaxHighlighter> */}
      </div>
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
