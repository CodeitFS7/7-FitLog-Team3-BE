import { journalsRouter } from '../../journals/routes/index.js';
import { prisma } from '../../utils/prisma.js';
export class EmojisRepository {
  upsertEmoji = async (journalId, emojiType) => {
    const emoji = await prisma.emoji.upsert({
      where: {
        id_journalId: {
          id: emojiType,
          journalId: journalId,
        },
      },

      update: {
        count: {
          increment: 1,
        },
      },

      create: {
        id: emojiType,
        journalId: journalId,
        count: 1,
      },
    });
    return emoji;
  };

  getEmojisByJournalId = async (jouranlId) => {
    const emojis = await prisma.emoji.findMany({
      where: {
        journalId: jouranlId,
      },
      orderBy: {
        count: 'desc',
      },
    });
    return emojis;
  };
}
