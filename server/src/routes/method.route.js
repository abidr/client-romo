const express = require('express');

const router = express.Router();

const { withAuth, isAdmin } = require('../middlewares/auth.middleware');

const {
  getAllMethods, getMethodById, createMethod, updateMethod, deleteMethod,
} = require('../controllers/method.controller');

router.get('/methods', withAuth, getAllMethods);
router.get('/methods/:id', withAuth, getMethodById);
router.post('/methods', withAuth, isAdmin, createMethod);
router.put('/methods/:id', withAuth, isAdmin, updateMethod);
router.delete('/methods/:id', withAuth, isAdmin, deleteMethod);

module.exports = router;
