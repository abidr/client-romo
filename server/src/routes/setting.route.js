const express = require('express');

const router = express.Router();
const multerInstance = require('../config/multer.config');

const { withAuth, isAdmin } = require('../middlewares/auth.middleware');

const {
  updateFees, updateGateways, getSettingByValue, getSettings, getDashboard, updateSettingByValue,
  getLogs, updateRewards, updateGeneral, getGateways, getGatewaysAdmin, getGatewayByValueAdmin,
  updateAdjustments, getDashboardUser, getGatewayCurrencies, updateFooterMenu, updateMainMenu,
  getBasicInfo, updateLogoFav, handleImageUpload, sendUserEmail, updateRepeater,
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
router.get('/gateways/currencies', getGatewayCurrencies);
router.get('/gateways/admin', withAuth, isAdmin, getGatewaysAdmin);
router.get('/gateways/:value', withAuth, isAdmin, getGatewayByValueAdmin);
router.get('/info', getBasicInfo);
router.put('/menu/main', withAuth, isAdmin, updateMainMenu);
router.put('/menu/footer', withAuth, isAdmin, updateFooterMenu);
router.put('/repeater/:value', withAuth, isAdmin, updateRepeater);
router.put('/logo', withAuth, isAdmin,
  multerInstance.upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'favicon', maxCount: 1 },
  ]), updateLogoFav);
router.post('/upload', withAuth, isAdmin, multerInstance.upload.single('image'), handleImageUpload);
router.post('/email', withAuth, isAdmin, sendUserEmail);

module.exports = router;
