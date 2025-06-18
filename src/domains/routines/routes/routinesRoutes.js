import express from 'express';
import { RoutinesController } from '../controller/routinesController.js';
import { validateRoutineCreation } from '../../middlewares/validateRoutineCreation.js';
import { validateRoutineUpdate } from '../../middlewares/validateRoutineUpdate.js';


const router = express.Router();

router.post("/routines/:journalId", validateRoutineCreation, RoutinesController.createRoutine);
router.patch("/routines/:routineId", validateRoutineUpdate, RoutinesController.updateRoutine);

export default router;