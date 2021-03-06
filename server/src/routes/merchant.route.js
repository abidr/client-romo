const express = require('express');

const router = express.Router();

const { withAuth, isAdmin, withAuthAdmin } = require('../middlewares/auth.middleware');

const {
  updateMerchant, updateMerchantAdmin, getAllMerchants, getMerchantById,
  deleteMerchant, createMerchant, createAgent, deleteAgent, confirmAgent, generateApi, getApi,
  initPayment, sendOtp, sendPayment, verifyPayment, findPayment,
  initDisbursement, checkDisbursement,
} = require('../controllers/merchant.controller');

router.get('/merchants', withAuthAdmin, isAdmin, getAllMerchants);
router.get('/merchants/:id', withAuthAdmin, isAdmin, getMerchantById);
router.post('/merchants', withAuthAdmin, isAdmin, createMerchant);
router.post('/agents', withAuthAdmin, isAdmin, createAgent);
router.post('/agent/confirm', withAuthAdmin, isAdmin, confirmAgent);
router.put('/merchants/me', withAuth, updateMerchant);
router.put('/merchants/:id', withAuthAdmin, isAdmin, updateMerchantAdmin);
router.delete('/merchants/:id', withAuthAdmin, isAdmin, deleteMerchant);
router.delete('/agents/:id', withAuthAdmin, isAdmin, deleteAgent);
router.get('/api-key', withAuth, getApi);
router.post('/api-key/generate', withAuth, generateApi);
router.post('/checkout/v2/initiate', initPayment);
router.post('/checkout/v2/customer/otp', sendOtp);
router.post('/checkout/v2/customer/pay', sendPayment);
router.get('/checkout/v2/verify', verifyPayment);
router.get('/checkout/v2/find', findPayment);
router.post('/disbursement/v2/initiate', initDisbursement);
router.get('/disbursement/v2/check', checkDisbursement);

module.exports = router;
