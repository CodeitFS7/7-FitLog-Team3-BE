import express from 'express';
import { routinesController } from '../controller/routineController.js';
import { validateRoutineCreation } from '../../middlewares/validateRoutineCreation.js';
import { validateRoutineUpdate } from '../../middlewares/validateRoutineUpdate.js';


const router = express.Router();

router.post("/routines/:journalId", validateRoutineCreation, routinesController.createRoutine);
router.patch("/routines/:journalId", validateRoutineUpdate, routinesController.updateRoutine);
router.get("/routines", routinesController.getPosts);

export default router; 