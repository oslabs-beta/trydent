// first commit
import React, { useState, useEffect } from 'react';
import CodeBlock from './pages/CodeBlock'
import EventLogger from './EventLogger';
import TopBar from './TopBar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import TestPage from './pages/TestPage';

const App: React.FC = () => {
  return (
    <div className='router'>
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
