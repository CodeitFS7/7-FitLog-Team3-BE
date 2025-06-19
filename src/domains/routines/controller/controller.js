import { isUUID } from '../../../../src/domains/utils/validator.utils.js';

export class RoutinesController {
  constructor(routinesService) {
    this.routinesService = routinesService;
  }
  async createRoutine(req, res) {
    try {
      const { journalId } = req.params;
      const { title } = req.body;

      const newRoutine = await this.routinesService.create(journalId, { title });

      res.status(201).json({
        message: '루틴이 성공적으로 생성되었습니다.',
        routine: newRoutine,
      });
    } catch (error) {
      if (error.message === '루틴을 생성할 저널을 찾을 수 없습니다.') {
        return res.status(404).json({ message: error.message });
      } else if (error.message === '일지에 이미 존재하는 루틴입니다.') {
        return res.status(409).json({ message: error.message });
      } else if (error.message === '루틴 생성에 실패했습니다.') {
        return res.status(500).json({ message: error.message });
      } else {
        console.error('루틴 생성 중 알 수 없는 오류 발생:', error);
        return res.status(500).json({ message: '알 수 없는 서버 오류가 발생했습니다.' });
      }
    }
  }

  async updateRoutine(req, res) {
    try {
      const { routineId } = req.params;
      const updateData = req.body;

      const result = await this.routinesService.update(routineId, updateData);

      if (result && result.message === '변경 사항이 없어 루틴을 업데이트하지 않았습니다.') {
        return res.status(200).json({ message: result.message, routine: result.routine });
      }

      res.status(200).json({
        message: '루틴 수정이 성공했습니다.',
        routine: result,
      });
    } catch (error) {
      if (error.message === '업데이트할 루틴을 찾을 수 없습니다.') {
        return res.status(404).json({ message: error.message });
      } else if (error.message === '일지에 이미 존재하는 루틴입니다.') {
        return res.status(409).json({ message: error.message });
      } else if (error.message === '루틴 업데이트에 실패했습니다.') {
        return res.status(500).json({ message: error.message });
      } else {
        console.error('루틴 업데이트 중 알 수 없는 오류 발생:', error);
        return res.status(500).json({ message: '알 수 없는 서버 오류가 발생했습니다.' });
      }
    }
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
      const routines = await this.routinesService.getAllRoutines(journalId);
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
      await this.routinesService.deleteRoutine(id, userId);
      res.sendStatus(204);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  }
}
