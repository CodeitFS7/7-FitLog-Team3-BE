import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routineRouter from './src/domains/routines/routes/route.js';
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
app.use('/routines', routineRouter);

// 테스트용 라우터
app.get('/', (req, res) => {
  res.send('서버 실행 중');
});

app.use('/journals', journalsRouter);
app.use('/routines', routinesRouter);
app.use('/exerciseLogs', exerciseLogRouter);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status ?? 500).json(err.message);
});

app.use('/routines', routinesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('서버 실행됨');
});
