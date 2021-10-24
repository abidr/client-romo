const express = require('express');

const router = express.Router();
const multerInstance = require('../config/multer.config');

const { withAuth, isAdmin } = require('../middlewares/auth.middleware');

const {
  getAllCurrencies, createCurrency, getCurrencyById, updateCurrency,
  deleteCurrency, fetchCurrencyRates, getCurrencyList,
} = require('../controllers/currency.controller');

router.get('/currencies', getAllCurrencies);
router.get('/currencies/list', getCurrencyList);
router.get('/currencies/:id', getCurrencyById);
router.post('/fetchrates', withAuth, isAdmin, fetchCurrencyRates);
router.post('/currencies', withAuth, isAdmin, multerInstance.upload.single('icon'), createCurrency);
router.put('/currencies/:id', withAuth, isAdmin, updateCurrency);
router.delete('/currencies/:id', withAuth, isAdmin, deleteCurrency);

module.exports = router;
