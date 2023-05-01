// imports we use
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import WelcomePage from './pages/WelcomePage';
import TestPage from './pages/TestPage';
import CodeBlock from './pages/CodeBlock'

// imports necessary to prevent bundling errors
import EventLogger from './EventLogger';

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
