import React from 'react';
import { Route, Routes } from "react-router-dom";
import BurglaryImage from '../src/assets/thief-ga85559527_1920.jpg';
import GamePage from './pages/gamePage';
import HomePage from './pages/homePage';
import InstructionPage from './pages/instructionPage';
import './App.css';

function App() {

  return (
    <div className='App' style={{ backgroundImage: `url(${BurglaryImage})` }}>
      <div className='content-instructions'>
        <h1 className='title'>Burglary Game</h1>
        <Routes>
          <Route path="/" element={<HomePage/>} exact />
          <Route path="/game" element={<GamePage/>} />
          <Route path="/instructions" element={<InstructionPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
