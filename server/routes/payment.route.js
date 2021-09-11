const express = require('express');

const router = express.Router();

const {
  verifyMollie, verifyCoinbase, verifyCoinPayments, verifyPaypal, verifyStripe,
} = require('../controllers/payment.controller');

router.post('/payments/mollie', verifyMollie);
router.post('/payments/coinbase', verifyCoinbase);
router.post('/payments/coinpayments', verifyCoinPayments);
router.get('/payments/paypal', verifyPaypal);
router.post('/payments/stripe', verifyStripe);

module.exports = router;
