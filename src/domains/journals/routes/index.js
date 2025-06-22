import { Router } from 'express';
import { JournalsController } from '../controller/index.js';
import { JournalsService } from '../service/index.js';
import { JournalsRepository } from '../repository/index.js';
import { validateCreateJournal } from '../../middlewares/validateJournalCreation.js';
import { validateGetJournalsQuery } from '../../middlewares/validateGetJournalsQuery.js';
import { validateJournalIdParam } from '../../middlewares/validateJournalIdParam.js';
import { emojisRouter } from '../../emojis/routes/index.js';
import { validatePatchJournals } from '../../middlewares/validatePatchJournals.js';

export const journalsRouter = Router();

const repository = new JournalsRepository();
const service = new JournalsService(repository);
const controller = new JournalsController(service);

journalsRouter.post('/', validateCreateJournal, controller.createJournal);
journalsRouter.get('/', validateGetJournalsQuery, controller.getJournals);
journalsRouter.get('/:journalId', validateJournalIdParam, controller.getJournalById);
journalsRouter.patch('/:journalId', validatePatchJournals, controller.updateJournalById);
journalsRouter.delete('/:journalId', validateJournalIdParam, controller.deleteJournalById);

journalsRouter.use('/:journalId/emojis', emojisRouter);
