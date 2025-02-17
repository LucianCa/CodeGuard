const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CodeGuard API is running' });
});

app.post('/api/analyze', (req, res) => {
  const { contractCode } = req.body;

  if (!contractCode) {
    return res.status(400).json({ error: 'Contract code is required' });
  }

  const mockAnalysis = {
    vulnerabilities: [
      {
        type: 'Reentrancy',
        severity: 'High',
        line: 42,
        description: 'Potential reentrancy attack vector detected'
      },
      {
        type: 'Integer Overflow',
        severity: 'Medium',
        line: 28,
        description: 'Arithmetic operation may overflow'
      }
    ],
    score: 65,
    timestamp: new Date().toISOString()
  };

  setTimeout(() => {
    res.json(mockAnalysis);
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});