describe('', () => {
  it('', () => {});
});

// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';

// import CodeBlock from '../../../../client/components/pages/CodeBlock';

// import React, { useState, useEffect } from 'react'; // ###TODO: useEffect is never used. Remove it?
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import prettier from 'prettier/standalone';
// import parserBabel from 'prettier/parser-babel';
// import GitHubButton from 'react-github-btn';

// describe('CodeBlock React Function Component', () => {
//   it('should render the CodeBlock component', () => {
//     render(<CodeBlock />);

//     expect(screen.getByRole('heading')).toHaveTextContent('Generated Test');
//     expect(screen.getByRole('button')).toHaveTextContent('Copy');
//     expect(screen.getByRole('link')).toHaveTextContent('Github');
//   });

//   it('should redirect the user to the GitHub repository when the "Star" button is clicked', () => {});
// });

// describe('CodeBlock prettierFormat function', () => {
//   it('should format code that is sent to it', () => {});
// });

// describe('CodeBlock handleCopy function', () => {
//   it('should provide an enabled and clickable copy button', () => {});

//   it('should display "Copied to Clipboard!" after clicking the "Copy" button', () => {});

//   it('should copy the text to the clipboard of the user', () => {});
// });

// describe('CodeBlock correct output for multiple test cases', () => {
//   it('test1');
//   it('test2');
//   it('test3');
// });

// describe('CodeBlock SyntaxHighlighter element', () => {
//   it('should display the formatted code', () => {});
// });

// /*

// <div className="codeBlock">
//   <div className="head">
//     <h1>Generated Test</h1>
//     <div className="copy-button">
//       <button onClick={handleCopy} disabled={copied} className={copied ? 'copied' : ''}>
//         {copied ? 'Copied to clipboard!' : 'Copy'}
//       </button>
//     </div>
//   </div>
//   <div className="code">
//     <SyntaxHighlighter
//       language="javascript"
//       style={oneDark}
//       customStyle={{ background: '#1A1A1A' }}
//       codeTagProps={{ style: { background: '#1A1A1A' } }}
//       wrapLines={true}
//       lineProps={{ style: { paddingRight: '1em' } }}
//     >
//       {formattedText ? formattedText : ''}
//     </SyntaxHighlighter>
//   </div>
//   <p>
//     Thank you for supporting TRYDENT. If you enjoyed, please give our{' '}
//     <a href="https://github.com/oslabs-beta/trydent" target="_blank">
//       Github
//     </a>{' '}
//     a star!
//   </p>
//   <GitHubButton
//     href="https://github.com/oslabs-beta/trydent"
//     data-icon="octicon-star"
//     aria-label="Star oslabs-beta/trydent on GitHub"
//   >
//     Star
//   </GitHubButton>
// </div>;

// */
