import express from 'express';
import config from './config';
import { listBuckets, sendImageToGCS } from './services/cloudstorage';

const app = express();
const PORT = config.get("PORT");

app.get('/', listBuckets, (req, res) => res.send('GET / done'));

app.get('/a', (req, res) => res.send('GET /a done'));

app.post('/', sendImageToGCS, (req, res) => res.send('POST / done'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  console.log(`SQL_PORT: ${config.get("SQL_PORT")}`);
});
