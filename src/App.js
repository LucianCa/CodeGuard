import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ContractAnalyzer from './components/ContractAnalyzer';
import AnalysisHistory from './components/AnalysisHistory';

function App() {
  const [activeTab, setActiveTab] = useState('analyzer');

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <div className="hero-section">
          <h2>Secure Your Smart Contracts</h2>
          <p>Advanced vulnerability detection and security analysis for Ethereum smart contracts</p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: '#1a202c',
            borderRadius: '8px',
            padding: '0.25rem',
            display: 'flex',
            gap: '0.25rem'
          }}>
            <button
              onClick={() => setActiveTab('analyzer')}
              style={{
                backgroundColor: activeTab === 'analyzer' ? '#3182ce' : 'transparent',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              Analyzer
            </button>
            <button
              onClick={() => setActiveTab('history')}
              style={{
                backgroundColor: activeTab === 'history' ? '#3182ce' : 'transparent',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              History
            </button>
          </div>
        </div>

        {activeTab === 'analyzer' ? <ContractAnalyzer /> : <AnalysisHistory />}
      </main>
    </div>
  );
}

export default App;