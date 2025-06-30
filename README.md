# README

# 운동 루틴 기록 웹 서비스 - README

## 📌 프로젝트 개요

- 사용자의 일상 운동 습관 형성과 집중 시간 기록을 돕기 위한 웹 서비스
- 운동 일지, 습관 체크, 타이머 기반 집중 기록 등을 통해 지속적인 루틴 형성과 동기부여를 제공
- 다른사람의 운동일지를 공유하며, 운동

## 🎯 기획 의도

- 운동을 꾸준히 하려는 사람들에게 재미와 성취감을 주기 위해 개발된 서비스
- 단순한 기록을 넘어 이모지, 도장, 포인트, 습관 등을 시각적으로 표현하여 사용자가 루틴을 지속할 수 있도록 유도합니다.

## 🛠️ 기술 스택

- Frontend: React
- Backend: Node.js, Express
- Database: PostgreSQL, Prisma ORM

## 📂 주요 폴더 구조

```
# 백엔드 폴더 구조
FITLOG-BE
└── 7-FitLog-Team3-BE
    ├── node_modules
    ├── prisma
    │   ├── migrations
    │   ├── schema.prisma
    │   └── seed.js
    ├── src / domains
    │   ├── emojis
    │   ├── exercise-logs
    │   ├── journals
    │   │   ├── controller
    │   │   ├── repository
    │   │   ├── routes
    │   │   └── service
    │   ├── middlewares
    │   ├── routines
    │   └── utils
    ├── .env
    ├── .eslintignore
    ├── .eslintrc.json
    ├── .gitignore
    ├── .prettierignore
    ├── .prettierrc
    ├── package-lock.json
    ├── package.json
    └── server.js

# 프론트엔드 폴더 구조
FITLOG-FE
└── 7-FitLog-Team3-FE
    ├── node_modules
    ├── public
    ├── src
    │   ├── api
    │   ├── assets
    │   ├── components
    │   │   ├── commonComponents
    │   │   ├── pagesComponents
    │   ├── css
    │   ├── pages
    │   │   ├── Exercise
    │   │   ├── JournalDetail
    │   │   ├── JournalsPost
    │   │   ├── MainPage
    │   │   ├── Routines
    │   │   └── UpdateJournal
    │   ├── ExerciseLogs.jsx
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── utils
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    └── LICENSE
    
```

## 🖥️ 기능 설명

### 📌 운동 메인 페이지

- 최근 운동일지 목록 조회
- 필터 (최근순, 오래된순, 포인트순 등)
- 운동일지 검색
- 운동일지 정보 (이름, 진행일수, 포인트 등) 표시
- 더보기 버튼을 통한 lazy loading
- 생성된 운동일지 없을 시 안내 문구 출력

### 📝 운동일지 만들기 페이지

- 닉네임, 운동일지 이름, 소개, 배경, 비밀번호 입력
- 8개의 배경 중 선택 (선택 시 워터마크 표시)
- 모든 필드 필수 입력 조건

### 📄 운동일지 상세페이지

- 공유하기 (SNS 또는 URL 복사)
- 이모지 추가 (다중 가능)
- 운동일지 정보 및 루틴 기록표 표시
- 비밀번호 인증 후: 수정, 삭제, 오늘의 루틴/운동페이지 진입 가능
- 루틴 색상 도장 표시

### 🪧 습관 상세 페이지 (운동 루틴)

- 닉네임, 일지 이름, 현재 시각, 오늘의 습관 표시
- 루틴체크 1회 1점
- 도장 및 누적 포인트 상단 표시
- 목록 수정 / 오늘의 운동 / 홈 이동 가능
- 루틴 없을 시 안내 문구 출력

### ⏱️ 집중 페이지 (개인 운동 시간)

- 목표 스탑워치 설정
- 스탑워치 시각적 효과 (남은 시간, 목표시간 초과시 회색, 10초 이하로 남았으면 빨간색)
- 스탑/일시정지 버튼 구성
- 시간 초과 또는 스탑 시 포인트 획득
    - 성공시 3점 + 10분당 1점 추가
    - 일시정지시 "집중이 중단되었습니다" 메시지 출력
- 포인트 획득 시 안내 메시지 출력



## 🙌  팀원 소개 및 R&R


### Chores

- 이유진
  - 팀 노션 문서 생성 및 흐름 관리
  - 공용 레포 생성 및 관리 Git 관리
  - 프로젝트 학습 내용 아카이빙 담당(백엔드)

- 김미정
  - README 업데이트
  - 회의록 작성 및 업로드

- 엄해진
  - 프로젝트 학습 내용 아카이빙 담당(기획, 프론트)
  - 문서 작성 보조

- 오해상

- 진주혁
  - 노션 팀할일목록 칸반보드 담당


### Dev

- 🦖 이유진
  - 운동 일지 API
  - 이모지 API
  - 루틴체크 API
  - 메인페이지 담당
  - 저널 수정 페이지 담당

- 김미정
  - 운동 기록 API
  - 운동기록페이지 담당

- 엄해진**
  - 운동 루틴 API
  - 저널 상세페이지 담당
  - 피그마 디자인 시안 제작(UI 개선, 디자인 수정)
  - FE 초기 파일 생성
           

- 오해상
  - 운동 루틴 API
  - 루틴 상세 페이지 담당

            
- 진주혁
  - 운동 일지 API
  - 저널 생성 페이지 담당


## 📅 프로젝트 일정 및 마일스톤


| 기간       | 단계             |            목표           |
|-----------|-----------------|---------=----------------|
| 6/11~6/13 | 기획             | 기능 정의서, ERD, 역할 분담   |
| 6/16~6/18 | 백엔드            | API 개발, DB 스키마 확정    |
| 6/19      | 프론트 공통 컴포넌트 | UI 요소 구현               |
| 6/20      | 중간 발표         | 핵심 기능 시연              |
| 6/20~6/23 | 프론트 UI 개발     | 프론트-백 연동, 주요 기능 구현 |
| 6/24~6/26 | 디버깅 & 스타일링   | 오류 수정, UI 개선          |
| 6/29~7/1  | 최종 발표 준비      | 발표자료, 레포 정리, 배포     |


⸻

## API 명세서 (대표)
	•	운동일지 API
	•	GET /journals : 운동일지 목록 조회
	•	POST /journals : 운동일지 생성
	•	PATCH /journals/:journalId : 운동일지 수정
	•	DELETE /journals/:journalId : 운동일지 삭제
	•	POST /journals/:journalId/verifyJournalPassword : 비밀번호 검증
	•	운동루틴 API
	•	GET /routines?journalId : 루틴 목록 조회
	•	POST /routines/:journalId : 루틴 생성
	•	PATCH /routines/:routineId : 루틴 수정
	•	DELETE /routines/:routineId : 루틴 삭제
	•	POST /routines/:routineId/updateCheckRoutine?journalId : 루틴 체크/해제
	•	운동기록 API
	•	POST /exerciseLogs/:journalId : 운동기록 생성
	•	GET /exerciseLogs/:journalId : 운동기록 포인트 조회
	•	이모지 API
	•	POST /journals/:journalId/emojis : 이모지 추가
	•	GET /journals/:journalId/emojis : 이모지 조회

⸻

## 프로젝트 배포 링크
- 	FitLog 사이트
- 	GitHub 레포지토리
