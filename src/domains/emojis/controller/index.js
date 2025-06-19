export class EmojisController {
  constructor(emojisService) {
    this.emojisService = emojisService;
  }

  addOrUpdateEmoji = async (req, res, next) => {
    try {
      const { journalId } = req.params;
      const { emojiType } = req.body;

      const updateEmoji = await this.emojisService.addOrUpdateEmoji(journalId, emojiType);
      return res.status(200).json({ data: updateEmoji });
    } catch (error) {
      next(error);
    }
  };

  getEmojisByJournalId = async (req, res, next) => {
    try {
      const { journalId } = req.params;

      const emojis = await this.emojisService.getEmojisByJournalId(journalId);
      return res.status(200).json({ data: emojis });
    } catch (error) {
      next(error);
    }
  };
}
