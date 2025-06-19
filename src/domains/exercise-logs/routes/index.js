import { Router } from 'express';
import ExerciseLogController from '../controller/index.js';
import ExerciseLogService from '../service/index.js';
import ExerciseLogRepository from '../repository/index.js';

export const exerciseLogRouter = Router();

// repository → service → controller
const repository = new ExerciseLogRepository();
const service = new ExerciseLogService(repository);
const controller = new ExerciseLogController(service);

// POST /exercise-log
exerciseLogRouter.post('/exercise-logs', (req, res, next) => {
  controller.create(req, res, next);
});

//GET /exercise-logs
exerciseLogRouter.get('/exercise-logs/:journalId', (req, res, next) => {
  controller.getLatestLogWithSummary(req, res, next);
});