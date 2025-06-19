import { isUUID } from '../../../../src/domains/utils/validator.utils.js';

export class RoutineController {
  constructor(routineService) {
    this.routineService = routineService;
  }

  async getAllRoutines(req, res) {
    const { journalId } = req.query;

    if (!journalId) {
      return res.status(400).json({ message: 'journalId is required.' });
    }

    if (!isUUID(journalId)) {
      return res.status(400).json({ message: 'Invalid journalId format (UUID expected).' });
    }

    try {
      const routines = await this.routineService.getAllRoutines(journalId);
      res.status(200).json(routines);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  }

  async deleteRoutine(req, res) {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!isUUID(id)) {
      return res.status(400).json({ message: 'Invalid routine ID format (UUID expected).' });
    }

    try {
      await this.routineService.deleteRoutine(id, userId);
      res.sendStatus(204);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  }
}
