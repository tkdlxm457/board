const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use('/api', (req, res) => res.json({username: 'bryan'}));


/**
 * 1. router가 뭔지 알아보기
 * 2. db연결
 * 3. post맨으로 쿼리 날려보기
 * 4. axios로 클라이언트와 서버 거래
 * 5. 화면 바인딩
 */

app.listen(port, () => {
    console.log(`express is running on ${port}`);
});