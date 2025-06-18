import { Router } from 'express';
import ExerciseLogController from '../controller/index.js';
import ExerciseLogService from '../service/index.js';
import ExerciseLogRepository from '../repository/index.js';
import prisma from '../prismaClient.js';

export const exerciseLogRouter = Router();

// repository → service → controller
const repository = new ExerciseLogRepository(prisma);
const service = new ExerciseLogService(repository);
const controller = new ExerciseLogController(service);

// POST /exercise-log
router.post('/exercise-log', (req, res, next) => {
  controller.create(req, res, next);
});

