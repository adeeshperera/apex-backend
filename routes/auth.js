const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateInput } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateInput(['name', 'email', 'password']), register);
router.post('/login', validateInput(['email', 'password']), login);
router.get('/profile', protect, getProfile);

module.exports = router;