import React, { useState, useEffect } from 'react';
import CodeBlock from './CodeBlock'
import EventLogger from './EventLogger';

const App: React.FC = () => {
  return (
    <div>
      <h1>Logged Events</h1>
      <p>Pain</p>
      <h3>Code Block</h3>
      <CodeBlock />
      <EventLogger />
    </div>
  );
};

export default App;
