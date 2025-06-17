import { deleteJournalById, updateJournalById } from '../service/journalService.js';

// DELETE /journals/:id 요청을 처리하는 컨트롤러
export const deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteJournalById(id);
    res.status(404).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};