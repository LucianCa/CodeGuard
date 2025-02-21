const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../data/codeguard.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeSchema();
  }
});

const initializeSchema = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS analyses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contract_hash TEXT NOT NULL,
        contract_code TEXT NOT NULL,
        vulnerabilities TEXT NOT NULL,
        security_score INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS vulnerability_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        severity TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const vulnTypes = [
      ['Reentrancy', 'Vulnerability allowing recursive calls before state updates', 'High'],
      ['Integer Overflow', 'Arithmetic operations that may exceed variable limits', 'Medium'],
      ['tx.origin Usage', 'Using tx.origin for authorization instead of msg.sender', 'Medium'],
      ['Timestamp Dependence', 'Relying on block.timestamp for critical logic', 'Low'],
      ['Destructive Operation', 'Contract can be destroyed via selfdestruct', 'High']
    ];

    const stmt = db.prepare(`INSERT OR IGNORE INTO vulnerability_types (name, description, severity) VALUES (?, ?, ?)`);
    vulnTypes.forEach(type => {
      stmt.run(type);
    });
    stmt.finalize();
  });
};

const saveAnalysis = (contractHash, contractCode, vulnerabilities, securityScore) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO analyses (contract_hash, contract_code, vulnerabilities, security_score)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run([contractHash, contractCode, JSON.stringify(vulnerabilities), securityScore], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });

    stmt.finalize();
  });
};

const getAnalysisByHash = (contractHash) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM analyses WHERE contract_hash = ? ORDER BY created_at DESC LIMIT 1',
      [contractHash],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            row.vulnerabilities = JSON.parse(row.vulnerabilities);
          }
          resolve(row);
        }
      }
    );
  });
};

module.exports = {
  db,
  saveAnalysis,
  getAnalysisByHash
};