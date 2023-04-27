import React, { useState, useEffect } from 'react';
import CodeBlock from './CodeBlock'
import EventLogger from './EventLogger';
import TopBar from './topBar';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcomePage';
import TestPage from './pages/testPage';

const App: React.FC = () => {
  return (
<<<<<<< HEAD
    <div className='router'>
=======
    <div>
      <h1>Logged Events</h1>
      <p>Pain</p>
      <h3>Code Block</h3>
      <CodeBlock />
>>>>>>> dev
      <EventLogger />
      <TopBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </div>
  );
};

export default App;
