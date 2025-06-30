import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import VoiceText from './pages/VoiceText';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<VoiceText />} />
      </Routes>
    </div>
  );
}

export default App
