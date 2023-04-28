import React, { useState, useEffect } from 'react';
import { sampleTextFormatted } from '../../utils/testCreator';

const CodeBlock: React.FC = () => {
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

  return (
    <div className="codeBlock">
      <h1>Generated Test</h1>
      <pre>
        <button
          onClick={handleCopy}
          disabled={copied}
          className={copied ? 'copied' : ''}
        >
          {copied ? 'Copied to clipboard!' : 'Copy'}
        </button>
        <code id="codeBlock">{sampleTextFormatted}</code>
      </pre>
      <p>Thank you for supporting TRYDENT. If you enjoyed, please give our <a href="https://github.com/oslabs-beta/trydent" target="_blank">Github</a> a star!</p>
    </div>
  );
};

export default CodeBlock;
