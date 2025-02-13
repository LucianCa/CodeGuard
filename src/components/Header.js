import React from 'react';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#1a1a2e',
      padding: '1rem 2rem',
      color: 'white',
      borderBottom: '2px solid #16213e'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>CodeGuard</h1>
          <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>
            Smart Contract Security Analysis
          </p>
        </div>
        <nav>
          <button style={{
            background: 'transparent',
            border: '1px solid #4a5568',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Analyze Contract
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;