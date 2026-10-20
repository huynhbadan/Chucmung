import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Serve static assets from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// SPA fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(Number(port), '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
