const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const {
  signUp, signIn, signOut, forgotPassword, resetInit, activateAccount,
} = require('../controllers/auth.controller');

const { withAuth, checkAuth } = require('../middlewares/auth.middleware');

// Authentication
router.post(
  '/signup',
  [
    check('name', 'Name should be at least 3 char').isLength({ min: 3 }),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password should be at least 8 char').isLength({ min: 8 }),
  ],
  signUp,
);

router.post(
  '/signin',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password field is required').isLength({ min: 8 }),
  ],
  signIn,
);

router.post(
  '/forgot',
  [
    check('email', 'Email is required').isEmail(),
  ],
  forgotPassword,
);

router.post(
  '/reset',
  [
    check('password', 'Password must be 8 char').isLength({ min: 8 }),
  ],
  resetInit,
);

router.post('/activate', activateAccount);

router.get('/checkauth', withAuth, checkAuth);
router.get('/signout', signOut);

module.exports = router;
