# CodeGuard

A smart contract security analysis tool for identifying vulnerabilities and generating comprehensive audit reports.

## Features

- **Real-time Vulnerability Detection** - Automatically scans Solidity code for security issues
- **Security Scoring System** - Provides security scores from 0-100 based on detected vulnerabilities
- **Analysis History** - Keeps track of previous scans with local storage
- **Multiple Vulnerability Types** - Detects reentrancy, integer overflow, timestamp dependence, and more
- **Detailed Reports** - Shows exact line numbers and code snippets for each vulnerability

## Vulnerability Detection

CodeGuard currently detects:

- **Reentrancy Attacks** (High severity) - Low-level calls without proper checks
- **Integer Overflow** (Medium severity) - Arithmetic operations without SafeMath
- **tx.origin Usage** (Medium severity) - Vulnerable authorization patterns
- **Timestamp Dependence** (Low severity) - Reliance on block.timestamp
- **Destructive Operations** (High severity) - Selfdestruct calls without proper access control

## Getting Started

### Frontend Only
```bash
npm install
npm start
```

### With Backend API
```bash
# Install dependencies
npm install

# Start backend server
npm run server

# Start frontend (in another terminal)
npm start
```

## Project Structure

```
CodeGuard/
├── src/
│   ├── components/          # React components
│   │   ├── Header.js
│   │   ├── ContractAnalyzer.js
│   │   └── AnalysisHistory.js
│   ├── utils/              # Utility functions
│   │   ├── api.js
│   │   └── vulnerabilityDetector.js
│   └── App.js
├── server/                 # Backend API
│   ├── index.js
│   └── database.js
└── public/
```

## Tech Stack

- **Frontend**: React + JavaScript
- **Backend**: Node.js + Express
- **Database**: SQLite
- **Blockchain**: ethers.js (planned)

## Usage

1. Navigate to the **Analyzer** tab
2. Paste your Solidity contract code into the text area
3. Click **Analyze Contract** to start the security scan
4. Review the results including security score and detailed vulnerability report
5. Check the **History** tab to see previous analyses

## Development Status

✅ Core vulnerability detection
✅ Frontend UI and analysis display
✅ Analysis history tracking
✅ Backend API with database storage
🚧 Advanced vulnerability patterns
🚧 Integration with blockchain networks
🚧 PDF report generation