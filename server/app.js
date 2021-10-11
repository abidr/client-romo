require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./src/config/db.config');

const server = express();

// Database
db.sequelize.sync();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.text());
server.use(cookieParser());
server.use(cors({ origin: true, credentials: true }));
server.use('/public', express.static('public'));

const authRoutes = require('./src/routes/auth.route');
const userRoutes = require('./src/routes/user.route');
const withdrawRoutes = require('./src/routes/withdraw.route');
const depositRoutes = require('./src/routes/deposit.route');
const transferRoutes = require('./src/routes/transfer.route');
const paymentRoutes = require('./src/routes/payment.route');
const settingRoutes = require('./src/routes/setting.route');
const currencyRoutes = require('./src/routes/currency.route');
const exchangeRoutes = require('./src/routes/exchange.route');
const walletRoutes = require('./src/routes/wallet.route');
const kycRoutes = require('./src/routes/kyc.route');

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
server.use('/', kycRoutes);

const port = process.env.PORT || 8000;

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`Ready on http://localhost:${port}`);
});
