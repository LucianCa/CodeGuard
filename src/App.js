import React from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <div className="hero-section">
          <h2>Secure Your Smart Contracts</h2>
          <p>Advanced vulnerability detection and security analysis for Ethereum smart contracts</p>
        </div>
      </main>
    </div>
  );
}

export default App;