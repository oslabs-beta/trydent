import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './TopBar';
import WelcomePage from './pages/WelcomePage';
import TestPage from './pages/TestPage';
import CodeBlock from './pages/CodeBlock';

// MASTER REPO-IMPORTS LIST
// repo-imports necessary to prevent bundling errors.
import { describeCreator } from '../utils/testCreator';
import { Describe, itObject, EventObj } from '../utils/types/types';

/**
 * The App component that renders the main layout of the application.
 * It includes the TopBar, WelcomePage, TestPage, and CodeBlock components
 * within their respective routes.
 *
 * @component
 * @returns {ReactElement} The App component
 */
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
