const express = require('express');
const branchController = require('../controllers/branchController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/verify', authMiddleware, branchController.verify);
router.get('/', authMiddleware, adminMiddleware, branchController.list);
router.post('/', authMiddleware, adminMiddleware, branchController.create);
router.put('/:id', authMiddleware, adminMiddleware, branchController.update);
router.patch('/:id/toggle', authMiddleware, adminMiddleware, branchController.toggle);

module.exports = router;
