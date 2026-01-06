import express from 'express';

const app = express();

/**
 * DP function to calculate unique paths
 */
function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  // first row & first column
  for (let i = 0; i < m; i++) dp[i][0] = 1;
  for (let j = 0; j < n; j++) dp[0][j] = 1;

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}

/**
 * API route
 * Example:
 * /unique-paths?m=3&n=7
 */
app.get('/unique-paths', (req, res) => {
  const m = parseInt(req.query.m);
  const n = parseInt(req.query.n);

  if (!Number.isInteger(m) || !Number.isInteger(n) || m <= 0 || n <= 0) {
    return res.status(400).json({
      error: 'Please provide valid positive integers m and n'
    });
  }

  const result = uniquePaths(m, n);

  res.json({
    m,
    n,
    uniquePaths: result
  });
});

/**
 * Root route (optional, but helpful)
 */
app.get('/', (req, res) => {
  res.send('Unique Paths API is running . Use /unique-paths?m=3&n=7 to get started.');
});

/**
 * START SERVER (THIS WAS MISSING)
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
