const express = require('express');

const router = express.Router();

const { withAuth, isAdmin } = require('../middlewares/auth.middleware');

const {
  getAllExchangesByUser, getAllExchanges, getExchangeById, createExchange,
  getExchangeByIdAdmin, acceptExchange, declineExchange,
} = require('../controllers/exchange.controller');

router.get('/exchanges/admin', withAuth, isAdmin, getAllExchanges);
router.get('/exchanges', withAuth, getAllExchangesByUser);
router.get('/exchanges/:id', withAuth, getExchangeById);
router.get('/exchanges/:id/admin', withAuth, isAdmin, getExchangeByIdAdmin);
router.post('/exchanges', withAuth, createExchange);
router.put('/exchanges/:id/accept', withAuth, isAdmin, acceptExchange);
router.put('/exchanges/:id/decline', withAuth, isAdmin, declineExchange);

module.exports = router;
