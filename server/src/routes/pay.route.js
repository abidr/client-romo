const express = require('express');

const router = express.Router();

const { withAuth, isAdmin, isMerchant } = require('../middlewares/auth.middleware');

const {
  getAllPaysByUser, getAllPays, getPaysByTrxId, createPays, deletePays, createPaysByTrx,
} = require('../controllers/pay.controller');

router.get('/pays/admin', withAuth, isAdmin, getAllPays);
router.get('/pays', withAuth, getAllPaysByUser);
router.get('/pays/trx/:trxId', withAuth, getPaysByTrxId);
router.post('/pays', withAuth, isMerchant, createPays);
router.post('/pays/trx', withAuth, isMerchant, createPaysByTrx);
router.delete('/pays/:id', withAuth, isAdmin, deletePays);

module.exports = router;