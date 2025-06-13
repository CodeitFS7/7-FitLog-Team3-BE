import { PrismaClient } from '@prisma/client';

// Prisma 클라이언트 인스턴스 생성
const prisma = new PrismaClient();

async function main() {
  console.log('시딩을 시작합니다...');

  const journal1 = await prisma.journal.upsert({
    where: { id: 'seed-journal-01' },
    update: {},
    create: {
      id: 'seed-journal-01',
      title: '운동 마스터의 일지',
      nickname: 'health-king',
      description: '이것은 운동 마스터의 샘플 일지입니다.',
      password: 'password123',
      background: 1,
      routinePoint: 250,
    },
  });

  await prisma.routine.createMany({
    data: [
      { title: '아침 공복 유산소', journalId: journal1.id },
      { title: '점심 후 가벼운 산책', journalId: journal1.id },
      { title: '저녁 근력 운동 (상체)', journalId: journal1.id },
      { title: '취침 전 스트레칭', journalId: journal1.id },
    ],
    skipDuplicates: true,
  });

  console.log(`'${journal1.title}'와 관련 루틴 4개가 생성되었습니다.`);

  const journal2 = await prisma.journal.upsert({
    where: { id: 'seed-journal-02' },
    update: {},
    create: {
      id: 'seed-journal-02',
      title: '코딩 천재의 일지',
      nickname: 'code-master',
      description: '이것은 코딩 천재의 샘플 일지입니다.',
      password: 'password456',
      background: 2,
      routinePoint: 500,
    },
  });

  await prisma.routine.createMany({
    data: [
      { title: '알고리즘 문제 1개 풀기', journalId: journal2.id },
      { title: '개발 블로그 포스팅', journalId: journal2.id },
      { title: 'TIL (Today I Learned) 작성', journalId: journal2.id },
      { title: '사이드 프로젝트 30분 진행', journalId: journal2.id },
    ],
    skipDuplicates: true,
  });

  console.log(`'${journal2.title}'와 관련 루틴 4개가 생성되었습니다.`);
  console.log('시딩이 완료되었습니다.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
