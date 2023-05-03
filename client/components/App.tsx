// ###TODO: useState and useEffect are not used in this file. Remove them?
import React, { useState, useEffect } from 'react';
// ###TODO: useNavigate is not used in this file. Remove it?
import { Routes, Route, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import WelcomePage from './pages/WelcomePage';
import TestPage from './pages/TestPage';
import CodeBlock from './pages/CodeBlock';

// MASTER REPO-IMPORTS LIST
// repo-imports necessary to prevent bundling errors.
// ###TODO 15 May 2023: remove imports that are not used in any other file
// --- --- --- --- --- --- --- --- ---
import { describeCreator } from '../utils/testCreator';
// ./client/utils/types folder
import { Describe, itObject, EventObj } from '../utils/types/types';

const App: React.FC = () => {
  return (
    <div className="router">
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
