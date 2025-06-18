import { RoutinesRepository } from '../repository/routinesRepository.js';
import { JournalsRepository } from '../../journals/repository/journalsRepositury.js';

class CreateRoutine {
    constructor(routinesRepository , journalsRepository ) {
        this.routinesRepository = routinesRepository;
        this.journalsRepository = journalsRepository;
  }

   async execute(journalId, routineData) {
        if (this.journalsRepository) { journalsRepository
            const journal = await this.journalsRepository.findById(journalId);
            if (!journal) {
                throw new Error('루틴을 생성할 저널을 찾을 수 없습니다.');
            }
        }
/* 동일한 루틴 중복 생성 방지 */ 
     const existingRoutineWithSameTitle = await this.routinesRepository.findByJournalIdAndTitle(
            journalId,
            routineData.title
        );

        if (existingRoutineWithSameTitle) {
            throw new Error('일지에 이미 존재하는 루틴입니다.');
        }
    const dataToCreate = {
        title: routineData.title,
        journalId: journalId,
    };

     try {
            const newRoutine = await this.routinesRepository.create(dataToCreate);
            return newRoutine;
        } catch (error) {
            throw error;
        }
    }
}

export const createRoutine = new CreateRoutine(RoutinesRepository, JournalsRepository);

/* CreateRoutine이라는 특정 루틴 생성 비즈니스 로직을 담당하는 객체를 생성하는데, 
이 객체가 데이터베이스와 상호작용하기 위해 필요한 routinesRepository와 journalsRepository라는 도구들을 외부에서 주입받아 사용하도록 설정한 후, 
이 완성된 비즈니스 로직 객체를 다른 곳에서 쉽게 가져다 쓸 수 있도록 외부에 공개(export)한다.*/ 