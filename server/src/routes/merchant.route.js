const express = require('express');

const router = express.Router();

const { withAuth, isAdmin } = require('../middlewares/auth.middleware');

const {
  updateMerchant, updateMerchantAdmin, getAllMerchants, getMerchantById,
  deleteMerchant, createMerchant,
} = require('../controllers/merchant.controller');

router.get('/merchants', withAuth, isAdmin, getAllMerchants);
router.get('/merchants/:id', withAuth, isAdmin, getMerchantById);
router.post('/merchants', withAuth, isAdmin, createMerchant);
router.put('/merchants/me', withAuth, updateMerchant);
router.put('/merchants/:id', withAuth, isAdmin, updateMerchantAdmin);
router.delete('/merchants/:id', withAuth, isAdmin, deleteMerchant);

module.exports = router;
