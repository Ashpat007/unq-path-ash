import express from 'express';

const app = express();
app.use(express.json());

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

function uniquePathsWithObstacles(m, n, blockedCells) {
  // build grid
  const grid = Array.from({ length: m }, () => Array(n).fill(0));

  // mark blocked cells
  for (const [r, c] of blockedCells) {
    if (r >= 0 && r < m && c >= 0 && c < n) {
      grid[r][c] = 1;
    }
  }

  // if start or end is blocked
  if (grid[0][0] === 1 || grid[m - 1][n - 1] === 1) {
    return 0;
  }

  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  dp[0][0] = 1;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        if (i > 0) dp[i][j] += dp[i - 1][j];
        if (j > 0) dp[i][j] += dp[i][j - 1];
      }
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

app.post('/unique-paths-2', (req, res) => {
  const { m, n, blockedCells } = req.body;

  if (
    !Number.isInteger(m) ||
    !Number.isInteger(n) ||
    m <= 0 ||
    n <= 0
  ) {
    return res.status(400).json({
      error: 'm and n must be positive integers'
    });
  }

  if (
    !Array.isArray(blockedCells) ||
    blockedCells.some(
      cell =>
        !Array.isArray(cell) ||
        cell.length !== 2 ||
        !Number.isInteger(cell[0]) ||
        !Number.isInteger(cell[1])
    )
  ) {
    return res.status(400).json({
      error: 'blockedCells must be an array of [row, col]'
    });
  }

  const result = uniquePathsWithObstacles(m, n, blockedCells);

  res.json({
    m,
    n,
    blockedCells,
    uniquePaths: result
  });
});


/**
 * Root route (optional, but helpful)
 */
app.get('/', (req, res) => {
  res.send(
  'Unique Paths API running. Use /unique-paths?m=3&n=7 or POST /unique-paths-2'
);

});

/**
 * START SERVER (THIS WAS MISSING)
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


