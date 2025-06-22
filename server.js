import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { journalsRouter } from './src/domains/journals/routes/index.js';
import { exerciseLogRouter } from './src/domains/exercise-logs/routes/index.js';
import routinesRouter from './src/domains/routines/routes/route.js';

// 환경 변수 사용준비
dotenv.config();
const app = express();

// 개발 편의상 모든 Origin 허용 (배포 시 origin 설정 필요)
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// 테스트용 라우터
app.get('/', (req, res) => {
  res.send('서버 실행 중');
});

app.use('/journals', journalsRouter);
app.use('/routines', routinesRouter);
app.use('/exerciseLogs', exerciseLogRouter);

app.use((err, req, res, next) => {
  // 개발 시 에러 스택을 콘솔에 출력 (디버깅용)
  // 배포 시에는 보안을 위해 `err.stack`을 클라이언트에게 직접 노출하지 않는 것이 좋음
  console.error(err.stack);
  console.error('에러 메시지:', err.message);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || '서버 오류가 발생했습니다.';

  // 클라이언트에게는 자세한 에러 스택을 보여주지 않는 것이 보안상 좋음
  res.status(statusCode).json({
    success: false,
    message: message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('서버 실행됨');
});
