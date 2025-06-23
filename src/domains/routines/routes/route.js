import express from 'express';
import { RoutinesRepository } from '../repository/index.js';
import { JournalsRepository } from '../../journals/repository/index.js';
import { RoutinesService } from '../service/index.js';
import { RoutinesController } from '../controller/index.js';
import { validateRoutineCreation } from '../../middlewares/validateRoutineCreation.js';
import { validateRoutineUpdate } from '../../middlewares/validateRoutineUpdate.js';
import { validateDeleteRoutineById } from '../../middlewares/validateDeleteRoutineById.js';
import { validateJournalIdQuery } from '../../middlewares/validateJournalIdQuery.js';
import { validateUpdateCheckRoutine } from '../../middlewares/validateUpdateCheckRoutine.js';
const router = express.Router();

// 의존성 주입
const repository = new RoutinesRepository();
const journalsRepository = new JournalsRepository();
const service = new RoutinesService(repository, journalsRepository);
const controller = new RoutinesController(service);

router.get('/', validateJournalIdQuery, controller.getAllRoutinesByJournalId);
router.delete('/:routineId', validateDeleteRoutineById, controller.deleteRoutine);

router.post('/:journalId', validateRoutineCreation, controller.createRoutine);
router.patch('/:routineId', validateRoutineUpdate, controller.updateRoutine);
router.post('/:routineId');

//루틴체크에 대한 API
router.post(
  '/:routineId/updateCheckRoutine',
  validateUpdateCheckRoutine,
  controller.updateCheckRoutine
);

export default router;
