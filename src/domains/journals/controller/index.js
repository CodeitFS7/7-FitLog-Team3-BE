export class JournalsController {
  journalsService;
  constructor(journalsService) {
    this.journalsService = journalsService;
  }

  createJournal = async (req, res, next) => {
    try {
      const { title, nickname, description, password, background } = req.body;

      const newJournal = await this.journalsService.createJournal(
        title,
        nickname,
        description,
        password,
        background
      );
      return res.status(201).json({ data: newJournal });
    } catch (error) {
      next(error);
    }
  };

  getJournals = async (req, res, next) => {
    try {
      const queryParams = req.query;
      const journalsData = await this.journalsService.findAllJournals(queryParams);

      return res.status(200).json({ data: journalsData });
    } catch (error) {
      next(error);
    }
  };

  getJournalById = async (req, res, next) => {
    try {
      const { journalId } = req.params;
      const journal = await this.journalsService.getJournalById(journalId);

      return res.status(200).json({ data: journal });
    } catch (error) {
      next(error);
    }
  };

  // DELETE /journals/:id 요청을 처리하는 컨트롤러
  deleteJournal = async (req, res) => {
    try {
      const { id } = req.params;
      await this.journalsService.deleteJournalById(id);
      res.status(204).send();
    } catch (error) {
      if (error.message === '존재하지 않는 journal입니다.') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  // PATCH /journals/:id 요청을 처리하는 컨트롤러
  updateJournal = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedJournal = await this.journalsService.updateJournalById(id, updateData);
      res.status(200).json(updatedJournal);
    } catch (error) {
      if (error.message === '존재하지 않는 journal입니다.') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }
};
