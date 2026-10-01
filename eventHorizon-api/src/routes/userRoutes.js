const express = require('express');
const protect = require('../middleware/auth');
const getProfile = require('../controllers/userControllers');
const router = express.Router();


router.get('/profile', protect, getProfile);


module.exports = router;
