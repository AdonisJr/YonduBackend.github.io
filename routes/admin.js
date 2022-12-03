const express = require('express');
const router = express.Router();

router.use('/', require('../controllers/users/controller'));
router.use('/', require('../controllers/auth/controller'));

module.exports = router;