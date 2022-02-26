const express = require('express');

const router = express.Router();

const {
  withAuth, isAdmin, withAuthAdmin,
} = require('../middlewares/auth.middleware');

const {
  getAllBills, getAllBillsByUser, createTopUp, deleteBills, topUpReview,
} = require('../controllers/bill.controller');

router.get('/bills/admin', withAuthAdmin, isAdmin, getAllBills);
router.get('/bills', withAuth, getAllBillsByUser);
router.post('/bills/topup', withAuth, createTopUp);
router.post('/bills/topup/review', withAuth, topUpReview);
router.delete('/bills/:id', withAuthAdmin, isAdmin, deleteBills);

module.exports = router;
