import express from 'express';
import { getStates, getStateBySlug } from '../controllers/stateController.js';

const router = express.Router();

router.get('/', getStates);
router.get('/:slug', getStateBySlug);

export default router;
