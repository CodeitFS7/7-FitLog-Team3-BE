import { Router } from 'express';
import { EmojisController } from '../controller/index.js';
import { EmojisService } from '../service/index.js';
import { EmojisRepository } from '../repository/index.js';
import { JournalsRepository } from '../../journals/repository/index.js';
import { validatePostEmoji } from '../../middlewares/validatePostEmoji.js';
import { validateGetEmojisByJournalId } from '../../middlewares/validateGetEmojisByJournalId.js';

export const emojisRouter = Router({ mergeParams: true });

const emojisRepository = new EmojisRepository();
const journalsRepository = new JournalsRepository();
const emojisService = new EmojisService(emojisRepository, journalsRepository);
const emojisController = new EmojisController(emojisService);

emojisRouter.post('/', validatePostEmoji, emojisController.addOrUpdateEmoji);
emojisRouter.get('/', validateGetEmojisByJournalId, emojisController.getEmojisByJournalId);
