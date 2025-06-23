import { Router } from 'express';
import ExerciseLogsController from '../controller/index.js';
import ExerciseLogsService from '../service/index.js';
import ExerciseLogsRepository from '../repository/index.js';
import { JournalsRepository } from '../../journals/repository/index.js';
import { validatePostExerciseLog } from '../../middlewares/validatePostExerciseLog.js';
import { validateJournalIdParam } from '../../middlewares/validateJournalIdParam.js';

export const exerciseLogRouter = Router();

// repository → service → controller
const repository = new ExerciseLogsRepository();
const journalsRepository = new JournalsRepository();
const service = new ExerciseLogsService(repository, journalsRepository);
const controller = new ExerciseLogsController(service);

// POST /exercise-log
exerciseLogRouter.post('/:journalId', validatePostExerciseLog, controller.createExerciseLog);

//GET /exercise-logs
exerciseLogRouter.get('/:journalId', validateJournalIdParam, controller.getSumExercisePoint);
