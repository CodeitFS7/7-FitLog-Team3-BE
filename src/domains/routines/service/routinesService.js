// import { RoutinesRepository } from '../repository/routinesRepository.js';
// import { JournalsRepository } from '../../journals/repository/journalsRepositury.js';

// class RoutinesService {
//     constructor(routinesRepository, journalsRepository) {
//         this.routinesRepository = routinesRepository;
//         this.journalsRepository = journalsRepository;
//     }
//     async create(journalId, routineData) {
//         // 저널 존재 여부 확인
//         const journal = await this.journalsRepository.findById(journalId);
//         if (!journal) {
//             throw new Error('루틴을 생성할 저널을 찾을 수 없습니다.');
//         }

//         // 동일한 루틴 중복 생성 방지
//         const existingRoutineWithSameTitle = await this.routinesRepository.findByJournalIdAndTitle(
//             journalId,
//             routineData.title
//         );

//         if (existingRoutineWithSameTitle) {
//             throw new Error('일지에 이미 존재하는 루틴입니다.');
//         }

//         // 루틴 생성 데이터 준비 및 저장
//         const dataToCreate = {
//             title: routineData.title,
//             journalId: journalId,
//         };

//         try {
//             const newRoutine = await this.routinesRepository.create(dataToCreate);
//             return newRoutine;
//         } catch (error) {
//             // 데이터베이스 오류 등 예외 처리
//             console.error("루틴 생성 중 오류 발생:", error);
//             throw new Error('루틴 생성에 실패했습니다.'); // 사용자에게 보여줄 일반적인 오류 메시지
//         }
//     }

//      async update(routineId, updateData) {
//         // 루틴 존재 여부 확인
//         const existingRoutine = await this.routinesRepository.findById(routineId);
//         if (!existingRoutine) {
//             throw new Error('업데이트할 루틴을 찾을 수 없습니다.');
//         }

//         // 업데이트 사항 여부 확인 및 중복 검사
//         let hasChanges = false;
//         const dataToUpdate = {};

//         // title 변경 시 중복 검사 및 업데이트 데이터 설정
//         if (updateData.title !== undefined) {
//             if (updateData.title !== existingRoutine.title) {
//                 const existingRoutineWithSameTitle = await this.routinesRepository.findByJournalIdAndTitle(
//                     existingRoutine.journalId,
//                     updateData.title
//                 );
//                 // 같은 저널 내에서 루틴 이름 중복 검사
//                 if (existingRoutineWithSameTitle) {
//                     throw new Error('일지에 이미 존재하는 루틴입니다.');
//                 }
//                 hasChanges = true;
//                 dataToUpdate.title = updateData.title;
//             }
//         }

//         // 변경 사항이 없을 경우 업데이트를 진행하지 않음
//         if (!hasChanges) {
//             return { message: "변경 사항이 존재하지 않습니다", routine: existingRoutine };
//         }

//         // 루틴 업데이트 시도
//         try {
//             const updatedRoutine = await this.routinesRepository.findByIdAndUpdate(routineId, dataToUpdate);
//             return updatedRoutine;
//         } catch (error) {
//             console.error("루틴 업데이트 중 오류 발생:", error);
//             throw new Error('루틴 업데이트에 실패했습니다.');
//         }
//     }
// }

// export const routinesService = new RoutinesService(
//     new RoutinesRepository(), // RoutinesRepository의 실제 인스턴스 주입
//     new JournalsRepository()  // JournalsRepository의 실제 인스턴스 주입
// );
