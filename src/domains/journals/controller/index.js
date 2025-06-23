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

      return res.status(200).json(journalsData);
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
  deleteJournalById = async (req, res, next) => {
    try {
      const { journalId } = req.params;
      await this.journalsService.deleteJournalById(journalId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  // PATCH /journals/:id 요청을 처리하는 컨트롤러
  updateJournalById = async (req, res, next) => {
    try {
      const { journalId } = req.params;
      const updateData = req.body;
      const updatedJournal = await this.journalsService.updateJournalById(journalId, updateData);
      res.status(200).json({ data: updatedJournal });
    } catch (error) {
      next(error);
    }
  };

  verifyJournalPassword = async (req, res, next) => {
    try {
      const { journalId } = req.params;
      const { password } = req.body;
      const result = await this.journalsService.verifyJournalPassword(journalId, password);
      res.status(200).json({ success: result });
    } catch (error) {
      next(error);
    }
  };
}
