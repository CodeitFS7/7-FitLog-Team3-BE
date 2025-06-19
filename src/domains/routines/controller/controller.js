import { isUUID } from '../../../../src/domains/utils/validator.utils.js';

export class RoutinesController {
  constructor(routinesService) {
    this.routinesService = routinesService;
  }

  // 컨트롤러의 역할은 request에서 받은 데이터를 service에게 넘겨주고,
  // 완성된 데이터(service,repository를 거쳐 완성된 데이터)를 response로 돌려주는 것
  // 에러 처리는 에러 라우터가 담당하기 때문에 에러를 에러라우터에게 넘겨주는 역할까지만 수행합니다.
  createRoutine = async (req, res, next) => {
    try {
      const { journalId } = req.params;
      const { title } = req.body;

      // 위에서 이미 구조분해할당을 통해 title을 가져왔기 때문에 서비스로 데이터를 넘겨줄때는 title으로 넘겨줍니다.
      const newRoutine = await this.routinesService.createRoutine(journalId, title);

      res.status(201).json({ data: newRoutine });
    } catch (error) {
      next(error);
    }
  };

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

  getAllRoutines = async (req, res) => {
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
  };

  deleteRoutine = async (req, res) => {
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
  };
}
