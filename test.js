const express = require('express');
const app = express();
const PORT = 4000;

app.get('/ping', (req, res) => {
  res.send('🏓 Pong!');
});

app.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
});