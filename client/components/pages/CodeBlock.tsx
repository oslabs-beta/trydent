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
    <div>
      <pre>
        <code id="codeBlock">{sampleTextFormatted}</code>
        <button onClick={handleCopy} disabled={copied}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </pre>
    </div>
  );
};

export default CodeBlock;
