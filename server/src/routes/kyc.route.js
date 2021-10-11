const express = require('express');

const router = express.Router();
const multerInstance = require('../config/multer.config');

const { withAuth, isAdmin } = require('../middlewares/auth.middleware');

const {
  getKycByUser, getAllKyc, createKyc, acceptKyc, declineKyc,
  resubmitKyc,
} = require('../controllers/kyc.controller');

router.get('/kyc', withAuth, isAdmin, getAllKyc);
router.get('/kyc/me', withAuth, getKycByUser);
router.post(
  '/kyc',
  withAuth,
  multerInstance.upload.fields([
    { name: 'front', maxCount: 1 },
    { name: 'back', maxCount: 1 },
    { name: 'selfie', maxCount: 1 },
  ]),
  createKyc,
);
router.post('/kyc/resubmit', withAuth, resubmitKyc);
router.put('/kyc/:id/accept', withAuth, isAdmin, acceptKyc);
router.put('/kyc/:id/decline', withAuth, isAdmin, declineKyc);

module.exports = router;
