const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { saveAnalysis, getAnalysisByHash } = require('./database');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CodeGuard API is running' });
});

app.post('/api/analyze', async (req, res) => {
  const { contractCode } = req.body;

  if (!contractCode) {
    return res.status(400).json({ error: 'Contract code is required' });
  }

  try {
    const contractHash = crypto.createHash('sha256').update(contractCode).digest('hex');

    const existingAnalysis = await getAnalysisByHash(contractHash);
    if (existingAnalysis) {
      return res.json({
        vulnerabilities: existingAnalysis.vulnerabilities,
        score: existingAnalysis.security_score,
        timestamp: existingAnalysis.created_at,
        cached: true
      });
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

    await saveAnalysis(contractHash, contractCode, mockAnalysis.vulnerabilities, mockAnalysis.score);

    setTimeout(() => {
      res.json(mockAnalysis);
    }, 2000);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});