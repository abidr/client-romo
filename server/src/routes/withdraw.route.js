const express = require('express');

const router = express.Router();

const { withAuth, isAdmin } = require('../middlewares/auth.middleware');

const {
  getAllWithdraws, getAllWithdrawsByUser, getWithdrawById, getWithdrawByIdAdmin,
  createWithdraw, acceptWithdraw, declineWithdraw,
} = require('../controllers/withdraw.controller');

router.get('/withdraws/admin', withAuth, isAdmin, getAllWithdraws);
router.get('/withdraws', withAuth, getAllWithdrawsByUser);
router.get('/withdraws/:id', withAuth, getWithdrawById);
router.get('/withdraws/:id/admin', withAuth, isAdmin, getWithdrawByIdAdmin);
router.post('/withdraws', withAuth, createWithdraw);
router.put('/withdraws/:id/accept', withAuth, isAdmin, acceptWithdraw);
router.put('/withdraws/:id/decline', withAuth, isAdmin, declineWithdraw);

module.exports = router;
