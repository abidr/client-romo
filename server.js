require('dotenv').config();

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./server/config/db.config');
const rootRouter = require('./server/rootRouter');

const server = express();

app.prepare().then(() => {
  // Database
  db.sequelize.sync();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(express.text());
  server.use(cookieParser());
  server.use(cors({ origin: true, credentials: true }));
  server.use('/api', rootRouter);

  server.get('*', (req, res) => handle(req, res));
  const port = process.env.PORT || 8000;

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
