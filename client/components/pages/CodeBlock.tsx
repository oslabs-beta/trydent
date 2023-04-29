import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

const prettierFormat = (input: string): string => {
  return prettier.format(input, {
    parser: 'babel',
    plugins: [parserBabel],
  });
};

let sampleText = `//High level description on how the button should be clicked
describe("click on the thing", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
    cy.window().should("have.property", "appReady", true);
  });

  it("should be a click3", () => {
    cy.xpath('[".XPATH"]').click();
    cy.url().should("include", "/user/login");
    cy.xpath('[".XPATH"]').input("typed into the box");
  });
  it("should be a input4", () => {
    cy.xpath('[".XPATH"]').click();
    cy.url().should("include", "/user/login");
    cy.xpath('[".XPATH"]').input("typed into the box");
  });
});`
let sampleTextFormatted = prettierFormat(sampleText);



/**
 * CodeBlock component displays the generated test code and provides functionality to copy to clipboard
 *
 * @component
 * @returns {ReactElement} JSX code for rendering the component
 */
const CodeBlock: React.FC = () => {
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
      await navigator.clipboard.writeText(sampleTextFormatted);
      setCopied(true);
    } catch (err) {
      console.log('Unable to copy text', err);
    }
    // remove textarea from document body after 2 seconds and reset copied status
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="codeBlock">
      <h1>Generated Test</h1>
      <pre>
        {/* Render the copy button and change its text and class depending on the 'copied' state */}
        <button
          onClick={handleCopy}
          disabled={copied}
          className={copied ? 'copied' : ''}
        >
          {copied ? 'Copied to clipboard!' : 'Copy'}
        </button>
        {/* Render the code block with the sample text */}
        <SyntaxHighlighter
          // automatic parsing of the language set to javascript
          language="javascript"
          // use the oneDark theme
          style={oneDark}
          // set the pre tag style
          customStyle={{
            background: '#1A1A1A',
          }}
          // set the code tag style
          codeTagProps={{
            style: {
              background: '#1A1A1A',
            },
          }}
          // must be enabled for lineProps to work
          wrapLines={true}
          // set the line style of the span that wraps each span of code
          lineProps={{
            style: {
              // set padding-right to make padding symmetrical
              paddingRight: '1em',
            }, 
          }}
        >
          {sampleTextFormatted}
        </SyntaxHighlighter>
      </pre>
      <p>Thank you for supporting TRYDENT. If you enjoyed, please give our <a href="https://github.com/oslabs-beta/trydent" target="_blank">Github</a> a star!</p>
    </div>
  );
};

export default CodeBlock;
