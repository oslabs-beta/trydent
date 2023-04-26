import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [events, setEvents] = useState<any[]>(JSON.parse(localStorage.getItem('loggedEvents') || '[]'));

  useEffect(() => {
    if (typeof chrome === 'undefined' || typeof chrome.runtime === 'undefined') {
      console.warn('chrome.runtime is not available');
      return;
    }
  
    const listener = (request, sender, sendResponse) => {
      console.log('Received message:', request);
      if (request.action === 'logEvent') {
        const newEvents = [...events, request.eventData];
        setEvents(newEvents);
        localStorage.setItem('loggedEvents', JSON.stringify(newEvents));
      }
    };
  
    chrome.runtime.onMessage.addListener(listener);
    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, [events]);
  
  

  return (
    <div>
      <h1>Logged Events</h1>
      {events.map((event, index) => (
        <pre key={index}>{JSON.stringify(event, null, 2)}</pre>
      ))}
    </div>
  );
};

export default App;
