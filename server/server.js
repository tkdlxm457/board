// express 모듈 호출
const express = require('express');
const app = express();
const api = require('./routes/index');
// api 처리는 './routes/index'에서 일괄처리
app.use('/api', api);
 
// server port 4000 할당
// 클라이언트와 다른 번호로 충돌나지 않도록
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})

/**
 * 1. router가 뭔지 알아보기
 * 2. db연결
 * 3. post맨으로 쿼리 날려보기
 * 4. axios로 클라이언트와 서버 거래
 * 5. 화면 바인딩
 */