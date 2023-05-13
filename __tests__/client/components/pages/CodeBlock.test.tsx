import CodeBlock from '../../../../client/components/pages/CodeBlock';

import React, { useState, useEffect } from 'react'; // ###TODO: useEffect is never used. Remove it?
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import GitHubButton from 'react-github-btn';

describe('CodeBlock React Function Component', () => {
  it('should render the CodeBlock component', () => {});

  it('should redirect the user to the GitHub repository when the "Star" button is clicked', () => {});
});

describe('CodeBlock prettierFormat function', () => {
  it('should format code that is sent to it', () => {});
});

describe('CodeBlock handleCopy function', () => {
  it('should provide an enabled and clickable copy button', () => {});

  it('should display "Copied to Clipboard!" after clicking the "Copy" button', () => {});

  it('should copy the text to the clipboard of the user', () => {});
});

describe('CodeBlock correct output for multiple test cases', () => {
  it('test1');
  it('test2');
  it('test3');
});

describe('CodeBlock SyntaxHighlighter element', () => {
  it('should display the formatted code', () => {});
});