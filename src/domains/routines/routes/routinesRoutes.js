import express from 'express';
import { routinesController } from '../controller/routineController.js';
import { validateRoutineCreation } from '../../middlewares/validateRoutineCreation.js';
import { validateRoutineUpdate } from '../../middlewares/validateRoutineUpdate.js';


const router = express.Router();

router.post("/journals/:journalId/routines", validateRoutineCreation, routinesController.createRoutine);
router.patch("/routines/:routineId", validateRoutineUpdate, routinesController.updateRoutine);

export default router; 