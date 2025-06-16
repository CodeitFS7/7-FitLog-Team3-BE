import { Router } from 'express';
import { JournalsController } from '../controller/index.js';
import { JournalsService } from '../service/index.js';
import { JournalsRepository } from '../repository/index.js';
import { validateCreateJournal } from '../../middlewares/validateJournalCreation.js';

export const journalsRouter = Router();

const repository = new JournalsRepository();
const service = new JournalsService(repository);
const controller = new JournalsController(service);

journalsRouter.post('/', validateCreateJournal, controller.createJournal);
