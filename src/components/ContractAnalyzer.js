import React, { useState } from 'react';

const ContractAnalyzer = () => {
  const [contractCode, setContractCode] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!contractCode.trim()) return;
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '2rem auto',
      padding: '0 1rem'
    }}>
      <div style={{
        backgroundColor: '#1a202c',
        borderRadius: '8px',
        padding: '2rem',
        border: '1px solid #2d3748'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#e2e8f0' }}>
          Contract Analysis
        </h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#a0aec0',
            fontSize: '0.9rem'
          }}>
            Paste your Solidity contract code:
          </label>

          <textarea
            value={contractCode}
            onChange={(e) => setContractCode(e.target.value)}
            placeholder="pragma solidity ^0.8.0;&#10;&#10;contract MyContract {&#10;    // Your contract code here&#10;}"
            style={{
              width: '100%',
              height: '200px',
              padding: '1rem',
              backgroundColor: '#2d3748',
              border: '1px solid #4a5568',
              borderRadius: '4px',
              color: 'white',
              fontSize: '0.9rem',
              fontFamily: 'Monaco, monospace',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!contractCode.trim() || analyzing}
          style={{
            backgroundColor: analyzing ? '#4a5568' : '#3182ce',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: analyzing ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}
        >
          {analyzing ? 'Analyzing...' : 'Analyze Contract'}
        </button>
      </div>
    </div>
  );
};

export default ContractAnalyzer;