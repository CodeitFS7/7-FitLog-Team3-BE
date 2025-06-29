import { Router } from 'express';
import { JournalsController } from '../controller/index.js';
import { JournalsService } from '../service/index.js';
import { JournalsRepository } from '../repository/index.js';
import ExerciseLogsService from '../../exercise-logs/service/index.js';
import ExerciseLogsRepository from '../../exercise-logs/repository/index.js';
import { validateCreateJournal } from '../../middlewares/validateJournalCreation.js';
import { validateGetJournalsQuery } from '../../middlewares/validateGetJournalsQuery.js';
import { validateJournalIdParam } from '../../middlewares/validateJournalIdParam.js';
import { emojisRouter } from '../../emojis/routes/index.js';
import { validatePatchJournals } from '../../middlewares/validatePatchJournals.js';
import { validatePostVerifyJournalPassword } from '../../middlewares/validatePostVerifyJournalPassword.js';

export const journalsRouter = Router();

const repository = new JournalsRepository();
const exerciseLogsRepository = new ExerciseLogsRepository();
const exerciseLogsService = new ExerciseLogsService(exerciseLogsRepository, repository);
const service = new JournalsService(repository, exerciseLogsService);
const controller = new JournalsController(service);

journalsRouter.post('/', validateCreateJournal, controller.createJournal);
journalsRouter.get('/', validateGetJournalsQuery, controller.getJournals);
journalsRouter.get('/:journalId', validateJournalIdParam, controller.getJournalById);
journalsRouter.patch('/:journalId', validatePatchJournals, controller.updateJournalById);
journalsRouter.delete('/:journalId', validateJournalIdParam, controller.deleteJournalById);
journalsRouter.post(
  '/:journalId/verifyJournalPassword',
  validatePostVerifyJournalPassword,
  controller.verifyJournalPassword
);

journalsRouter.use('/:journalId/emojis', emojisRouter);
