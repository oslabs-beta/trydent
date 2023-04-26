import React, { useState, useEffect } from 'react';
import EventLogger from './EventLogger';


const App: React.FC = () => {

  return (
    <div>
      <h1>Logged Events</h1>
      <p>Pain</p>
      <EventLogger />
    </div>
  );
};


export default App;
