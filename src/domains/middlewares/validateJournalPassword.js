// 비밀번호 일치 확인 로직이 안 보여서 미들웨어로 구현은 해뒀는데 // 
// 생각해보니 루틴은 따로 비밀번호가 필요하지 않더군요... ;.; 저널 라우터에 연결 해보았으니 참고 부탁드립니다.. 

const bcrypt = require("bcrypt"); //보통 비밀번호를 해시코드로 저장해둔다고 하더군요 bcrypt 형태로 불러 온다고 합니다. 관련 로직 있는게 좋을 것 같아요 
const { getJournalById } = require("../journals/service/journalsService"); 

export const validateJournalPassword = async (req, res, next) => {
  const journalId = req.params.id; 
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "비밀번호를 입력해주세요." });
  }

  try {
    const Journal = await getJournalById(journalId);

    if (!Journal) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    const isMatch = await bcrypt.compare(password, Journal.password); 

    if (!isMatch) {
      return res.status(403).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    req.Journal = Journal; 
    next();
  } catch (err) {
    console.error("비밀번호 확인 오류:", err);
    res.status(500).json({ message: "서버 오류입니다." });
  }
}



