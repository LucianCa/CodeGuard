import React, { useState } from 'react';
import { detectVulnerabilities, calculateSecurityScore } from '../utils/vulnerabilityDetector';

const ContractAnalyzer = () => {
  const [contractCode, setContractCode] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = () => {
    if (!contractCode.trim()) return;
    setAnalyzing(true);

    setTimeout(() => {
      const vulnerabilities = detectVulnerabilities(contractCode);
      const score = calculateSecurityScore(vulnerabilities);

      setResults({
        vulnerabilities,
        score,
        timestamp: new Date().toISOString()
      });
      setAnalyzing(false);
    }, 1500);
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

      {results && (
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
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ color: '#e2e8f0', margin: 0 }}>
                Analysis Results
              </h3>
              <div style={{
                backgroundColor: results.score >= 80 ? '#38a169' : results.score >= 60 ? '#ed8936' : '#e53e3e',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                Security Score: {results.score}/100
              </div>
            </div>

            {results.vulnerabilities.length > 0 ? (
              <div>
                <h4 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>
                  Vulnerabilities Found ({results.vulnerabilities.length})
                </h4>
                {results.vulnerabilities.map((vuln, index) => (
                  <div key={index} style={{
                    backgroundColor: '#2d3748',
                    border: `1px solid ${vuln.severity === 'High' ? '#e53e3e' : vuln.severity === 'Medium' ? '#ed8936' : '#38a169'}`,
                    borderRadius: '6px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem'
                    }}>
                      <h5 style={{
                        color: '#e2e8f0',
                        margin: 0,
                        fontSize: '1rem'
                      }}>
                        {vuln.type}
                      </h5>
                      <span style={{
                        backgroundColor: vuln.severity === 'High' ? '#e53e3e' : vuln.severity === 'Medium' ? '#ed8936' : '#38a169',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        {vuln.severity}
                      </span>
                    </div>
                    <p style={{
                      color: '#a0aec0',
                      margin: '0 0 0.5rem 0',
                      fontSize: '0.9rem'
                    }}>
                      {vuln.description}
                    </p>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#718096'
                    }}>
                      Line {vuln.line}: <code style={{
                        backgroundColor: '#4a5568',
                        padding: '0.2rem 0.4rem',
                        borderRadius: '3px',
                        color: '#e2e8f0'
                      }}>{vuln.code}</code>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                color: '#68d391',
                padding: '2rem'
              }}>
                <h4>No vulnerabilities detected!</h4>
                <p style={{ opacity: 0.8 }}>Your contract appears to follow security best practices.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractAnalyzer;