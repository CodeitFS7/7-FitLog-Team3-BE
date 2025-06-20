import express from 'express';
import { RoutinesRepository } from '../repository/repository.js';
import { JournalsRepository } from '../../journals/repository/index.js';
import { RoutinesService } from '../service/service.js';
import { RoutinesController } from '../controller/controller.js';
import { validateRoutineCreation } from '../../middlewares/validateRoutineCreation.js';
import { validateRoutineUpdate } from '../../middlewares/validateRoutineUpdate.js';
import { validateDeleteRoutineById } from '../../middlewares/validateDeleteRoutineById.js';
import { validateJournalId } from '../../middlewares/validateJournalId.js';

const router = express.Router();

// 의존성 주입
const repository = new RoutinesRepository();
const journalsRepository = new JournalsRepository();
const service = new RoutinesService(repository, journalsRepository);
const controller = new RoutinesController(service);

router.get('/', validateJournalId, controller.getAllRoutines);
router.delete('/:routineId', validateDeleteRoutineById, controller.deleteRoutine);

router.post('/:journalId', validateRoutineCreation, controller.createRoutine);
router.patch('/:routineId', validateRoutineUpdate, controller.updateRoutine);

export default router;
