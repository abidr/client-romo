const express = require('express');

const rootRouter = express.Router();

// Routes
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

// Actual Routes
rootRouter.use('/', authRoutes);
rootRouter.use('/', userRoutes);
rootRouter.use('/', withdrawRoutes);
rootRouter.use('/', depositRoutes);
rootRouter.use('/', transferRoutes);
rootRouter.use('/', paymentRoutes);
rootRouter.use('/', settingRoutes);
rootRouter.use('/', currencyRoutes);
rootRouter.use('/', exchangeRoutes);
rootRouter.use('/', walletRoutes);

module.exports = rootRouter;
