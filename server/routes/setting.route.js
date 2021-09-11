const express = require('express');

const router = express.Router();

const { withAuth, isAdmin } = require('../middlewares/auth.middleware');

const {
  updateFees, updateGateways, getSettingByValue, getSettings, getDashboard, updateSettingByValue,
  getLogs, updateRewards, updateGeneral, getGateways, getGatewaysAdmin, getGatewayByValueAdmin,
  updateAdjustments, getDashboardUser,
} = require('../controllers/setting.controller');

router.get('/settings', getSettings);
router.get('/dashboard', withAuth, isAdmin, getDashboard);
router.get('/dashboard/me', withAuth, getDashboardUser);
router.get('/logs', withAuth, isAdmin, getLogs);
router.get('/settings/:value', getSettingByValue);
router.put('/settings/byvalue/:value', updateSettingByValue);
router.put('/settings/fee', withAuth, isAdmin, updateFees);
router.put('/settings/rewards', withAuth, isAdmin, updateRewards);
router.put('/settings/adjustments', withAuth, isAdmin, updateAdjustments);
router.put('/settings/general', withAuth, isAdmin, updateGeneral);
router.put('/payments/:value', updateGateways);
router.get('/gateways', getGateways);
router.get('/gateways/admin', withAuth, isAdmin, getGatewaysAdmin);
router.get('/gateways/:value', withAuth, isAdmin, getGatewayByValueAdmin);

module.exports = router;
