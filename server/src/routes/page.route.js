const express = require('express');

const router = express.Router();

const { withAuth, isAdmin } = require('../middlewares/auth.middleware');

const {
  getAllPages, getPageBySlug, createPage, updatePage, deletePage,
} = require('../controllers/page.controller');

router.get('/pages', getAllPages);
router.get('/pages/:slug', getPageBySlug);
router.post('/pages', withAuth, isAdmin, createPage);
router.put('/pages/:slug', withAuth, isAdmin, updatePage);
router.delete('/pages/:slug', withAuth, isAdmin, deletePage);

module.exports = router;
