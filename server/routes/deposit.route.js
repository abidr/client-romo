const express = require('express');

const router = express.Router();

const { withAuth, isAdmin } = require('../middlewares/auth.middleware');

const {
  getAllDeposits, getAllDepositsByUser, getDepositById, getDepositByIdAdmin,
  createDeposit, acceptDeposit, declineDeposit,
} = require('../controllers/deposit.controller');

router.get('/deposits/admin', withAuth, isAdmin, getAllDeposits);
router.get('/deposits', withAuth, getAllDepositsByUser);
router.get('/deposits/:id', withAuth, getDepositById);
router.get('/deposits/:id/admin', withAuth, isAdmin, getDepositByIdAdmin);
router.post('/deposits', withAuth, createDeposit);
router.put('/deposits/:id/accept', withAuth, isAdmin, acceptDeposit);
router.put('/deposits/:id/decline', withAuth, isAdmin, declineDeposit);

module.exports = router;
