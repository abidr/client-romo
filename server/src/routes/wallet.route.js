const express = require('express');

const router = express.Router();

const { withAuth } = require('../middlewares/auth.middleware');
const {
  getWallet,
} = require('../controllers/wallet.controller');

router.get('/wallets/me', withAuth, getWallet);

module.exports = router;
