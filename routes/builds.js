const express = require('express');
const { getUserBuilds, createBuild, updateBuild, deleteBuild, getBuildById } = require('../controllers/buildController');
const { protect } = require('../middleware/auth');
const { validateInput } = require('../middleware/validation');

const router = express.Router();

router.get('/user/:userId', protect, getUserBuilds);
router.post('/', protect, validateInput(['carModel', 'color']), createBuild);
router.put('/:id', protect, updateBuild);
router.delete('/:id', protect, deleteBuild);
router.get('/:id', protect, getBuildById);

module.exports = router;