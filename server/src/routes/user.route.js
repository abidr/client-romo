const express = require('express');

const router = express.Router();

const { withAuth, isAdmin } = require('../middlewares/auth.middleware');
const {
  getAllUsers, countUsers, updateUser, updateUserAdmin, deleteUser, getUserDetails,
  getUserById,
} = require('../controllers/user.controller');

router.get('/users/count', withAuth, isAdmin, countUsers);
router.get('/users', withAuth, isAdmin, getAllUsers);
router.get('/users/me', withAuth, getUserDetails);
router.get('/users/:id', withAuth, isAdmin, getUserById);
router.put('/users/me', withAuth, updateUser);
router.put('/users/:id', withAuth, isAdmin, updateUserAdmin);
router.delete('/users/:id', withAuth, isAdmin, deleteUser);

module.exports = router;
