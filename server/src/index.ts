import express from 'express';
import config from './config';

const app = express();
const PORT = config.get("PORT");

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.get('/a', (req, res) => res.send('Express + A Server'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  console.log(`SQL_PORT: ${config.get("SQL_PORT")}`);
});