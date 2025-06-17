import express from 'express';
import { deleteJournal, updateJournal } from '../controller/journalController.js';

const router = express.Router();

// 운동일지 삭제 API
router.delete('/:id', deleteJournal);

export default router;