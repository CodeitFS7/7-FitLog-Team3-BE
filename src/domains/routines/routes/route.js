import express from 'express';
import { RoutineRepository } from '../repository/repository.js';
import { RoutineService } from '../service/service.js';
import { RoutineController } from '../controller/controller.js';

const router = express.Router();

// 의존성 주입
const repository = new RoutineRepository();
const service = new RoutineService(repository);
const controller = new RoutineController(service);

router.get('/', controller.getAllRoutines.bind(controller));
router.delete('/:id', controller.deleteRoutine.bind(controller));

export default router;
