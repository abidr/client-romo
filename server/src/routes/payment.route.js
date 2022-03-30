const express = require('express');

const router = express.Router();

const {
  verifyMollie, verifyCoinbase, verifyCoinPayments, verifyPaypal, verifyStripe, verifyPaystack,
  verifyCoingate, verifyPayDunya, verifyFlutterWave,
  verifyPerfectMoney, verifyMtn, verifyWithdrawMtn,
} = require('../controllers/payment.controller');

router.post('/payments/mollie', verifyMollie);
router.post('/payments/coinbase', verifyCoinbase);
router.post('/payments/coinpayments', verifyCoinPayments);
router.post('/payments/coingate', verifyCoingate);
router.get('/payments/paypal', verifyPaypal);
router.post('/payments/stripe', verifyStripe);
router.post('/payments/perfectmoney', verifyPerfectMoney);
router.post('/payments/paydunya', verifyPayDunya);
router.get('/payments/paystack', verifyPaystack);
router.get('/payments/flutterwave', verifyFlutterWave);
router.get('/payments/verifymtn', verifyMtn);
router.post('/payments/verifymtn', verifyMtn);
router.put('/payments/verifymtn', verifyMtn);
router.put('/payments/withdraw/mtn', verifyWithdrawMtn);

module.exports = router;
