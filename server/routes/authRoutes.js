const express = require('express');
const router = express.Router();
const { verifyUser, createSecret } = require('./authController');

router.post('/create-secret', createSecret);
router.post('/verify-user', verifyUser);

module.exports = router;
