import React, { useState, useEffect } from 'react';
import EventLogger from './EventLogger';
import TopBar from './topBar';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcomePage';
import TestPage from './pages/testPage';


const App: React.FC = () => {

  return (
    <div className='router'>
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
