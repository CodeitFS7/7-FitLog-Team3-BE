import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';


import journalsRouter from './src/domains/journals/routes/journalRoutes.js'; // 저널 관련 라우터 임포트


// 환경 변수 사용준비
dotenv.config();

const app = express();

// 개발 편의상 모든 Origin 허용 (배포 시 origin 설정 필요)
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use('/journals', journalsRouter); // 저널 관련 라우터 등록

// 테스트용 라우터
app.get('/', (req, res) => {
  res.send('서버 실행 중');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('서버 실행됨');
});
