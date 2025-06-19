import express from 'express';
import { journalsController } from '../controller/journalsController.js';
// import { validateJournalPassword } from '../../middlewares/validateJournalPassword.js';

const router = express.Router();


// router.patch("/journal/:Id", validateJournalPassword, journalsController.updateJournal);
// router.get("/journal", journalsController.getPosts);

export default router; 