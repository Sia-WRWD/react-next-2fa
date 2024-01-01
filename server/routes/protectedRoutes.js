const express = require('express');
const router = express.Router();
const { requireToken, accessProtectedResource } = require('./protectedController');

router.post('/protected', requireToken, accessProtectedResource);

module.exports = router;
