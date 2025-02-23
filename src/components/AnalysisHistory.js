import React, { useState, useEffect } from 'react';

const AnalysisHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = () => {
      const savedHistory = localStorage.getItem('codeguard_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      setLoading(false);
    };

    loadHistory();
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('codeguard_history');
    setHistory([]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#a0aec0' }}>
        Loading history...
      </div>
    );
  }

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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: '#e2e8f0', margin: 0 }}>
            Analysis History ({history.length})
          </h3>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              style={{
                backgroundColor: '#e53e3e',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Clear History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#a0aec0',
            padding: '2rem'
          }}>
            <p>No analysis history yet. Analyze some contracts to see them here!</p>
          </div>
        ) : (
          <div>
            {history.map((item, index) => (
              <div key={index} style={{
                backgroundColor: '#2d3748',
                borderRadius: '6px',
                padding: '1rem',
                marginBottom: '1rem',
                border: '1px solid #4a5568'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#a0aec0'
                  }}>
                    {formatDate(item.timestamp)}
                  </div>
                  <div style={{
                    backgroundColor: item.score >= 80 ? '#38a169' : item.score >= 60 ? '#ed8936' : '#e53e3e',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {item.score}/100
                  </div>
                </div>
                <div style={{
                  color: '#e2e8f0',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  {item.vulnerabilities.length} vulnerabilities found
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {item.vulnerabilities.slice(0, 3).map((vuln, vIndex) => (
                    <span key={vIndex} style={{
                      backgroundColor: vuln.severity === 'High' ? '#e53e3e' : vuln.severity === 'Medium' ? '#ed8936' : '#38a169',
                      color: 'white',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>
                      {vuln.type}
                    </span>
                  ))}
                  {item.vulnerabilities.length > 3 && (
                    <span style={{
                      color: '#a0aec0',
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem'
                    }}>
                      +{item.vulnerabilities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisHistory;