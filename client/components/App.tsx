import React, { useState, useEffect } from 'react';
import EventLogger from './EventLogger';
import { sampleTextFormatted } from '../utils/testCreator';

const App: React.FC = () => {
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
      <h1>Logged Events</h1>
      <p>Pain</p>
      <h3>Code Block</h3>
      <pre>
        <code id="codeBlock">{sampleTextFormatted}</code>
        <button onClick={handleCopy} disabled={copied}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </pre>
      <EventLogger />
    </div>
  );
};

export default App;
