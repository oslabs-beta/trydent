import React, { useState, useEffect } from 'react';
import CodeBlock from './pages/CodeBlock'
import EventLogger from './EventLogger';
import TopBar from './topBar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WelcomePage from './pages/welcomePage';
import TestPage from './pages/testPage';

const App: React.FC = () => {
  return (
    <div className='router'>
      <div>This is my App.tsx</div>
      <TopBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/testPage" element={<TestPage />} />
        <Route path="/codeBlock" element={<CodeBlock />} />

      </Routes>
    </div>
  );
};

export default App;
