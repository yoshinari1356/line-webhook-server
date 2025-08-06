express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3999;

// JSONをパース
app.use(bodyParser.json());

// LINE Webhookエンドポイント
app.post('/webhook', (req, res) => {
  console.log('✅ LINE Webhook受信:');
  console.log(JSON.stringify(req.body, null, 2));

  // LINE側に200を返さないとリトライされる
  res.status(200).send('OK');
});
// 404ハンドラー
app.use((req, res) => {
    res.status(404).send("404!");
});
// エラーハンドラ
app.use(
   (err, req, res, nex) => {
     console.error(err);
     res.send("Something broke!");
   }
);
// 起動
app.listen(PORT, () => {
  console.log(`🚀 Webhookサーバー起動: http://localhost:${PORT}`);
});

