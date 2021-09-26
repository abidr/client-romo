require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./config/db.config');

const server = express();

// Database
db.sequelize.sync();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.text());
server.use(cookieParser());
server.use(cors({ origin: true, credentials: true }));

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const withdrawRoutes = require('./routes/withdraw.route');
const depositRoutes = require('./routes/deposit.route');
const transferRoutes = require('./routes/transfer.route');
const paymentRoutes = require('./routes/payment.route');
const settingRoutes = require('./routes/setting.route');
const currencyRoutes = require('./routes/currency.route');
const exchangeRoutes = require('./routes/exchange.route');
const walletRoutes = require('./routes/wallet.route');

server.use('/', authRoutes);
server.use('/', userRoutes);
server.use('/', withdrawRoutes);
server.use('/', depositRoutes);
server.use('/', transferRoutes);
server.use('/', paymentRoutes);
server.use('/', settingRoutes);
server.use('/', currencyRoutes);
server.use('/', exchangeRoutes);
server.use('/', walletRoutes);

const port = process.env.PORT || 8000;

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`Ready on http://localhost:${port}`);
});
