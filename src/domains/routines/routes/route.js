import express from 'express';
import { getAllRoutines, deleteRoutine } from '../controller/controller.js';

const router = express.Router();

router.get('/', getAllRoutines);
router.delete('/:id', deleteRoutine);

export default router;
