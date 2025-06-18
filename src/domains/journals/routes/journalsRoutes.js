import express from 'express';
import { journalController } from '../controller/journalController.js';
import { validateJournalCreation } from '../../middlewares/validateJournalCreation.js';
import { validateJournalPassword } from '../../middlewares/validateJournalPassword.js';

const router = express.Router();

router.post("/journal/", validateJournalPassword, validateJournalCreation, journalController.createJournal);
router.patch("/journal/:Id", validateJournalPassword, journalController.updateJournal);
router.get("/journal", journalController.getPosts);

export default router;