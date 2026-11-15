import express from 'express';
import { getPackages, getPackageById, createPackage } from '../controllers/packageController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post('/', protect, authorize('admin'), createPackage);

export default router;
