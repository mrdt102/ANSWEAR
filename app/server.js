import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '3306';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'root';
const DB_NAME = process.env.DB_NAME || 'devops_test';

app.get('/health', (req, res) => res.status(200).send('OK'));

app.get('/', (req, res) => {
  res.type('text/plain').send('Welcome to DevOps Challenge!');
});

app.get('/api/messages', async (req, res) => {
  try {
    const conn = await mysql.createConnection({
      host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASS, database: DB_NAME
    });
    const [rows] = await conn.query('SELECT id, content, created_at FROM messages ORDER BY id DESC LIMIT 20');
    await conn.end();
    res.json(rows);
  } catch (e) {
    console.error('DB error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`App listening on ${PORT}`));
