express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3999;
const LINE_API = 'https://api.line.me/v2/bot/message/reply';
const LINE_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

app.use(bodyParser.json());

// LINE Webhookエンドポイント
app.post('/webhook', async (req, res) => {
  console.log('✅ LINE Webhook受信:');
  console.log(JSON.stringify(req.body, null, 2));

  const events = req.body.events;
  if (!events || events.length === 0) {
    return res.sendStatus(200);
  }

  for (const event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const userMessage = event.message.text;
      const replyToken = event.replyToken;

      // LINEに返信
      await replyMessage(replyToken, `受け取りました: ${userMessage}`);
    }
  }

  res.sendStatus(200);
});

// LINE返信関数
async function replyMessage(replyToken, message) {
  try {
    const response = await axios.post(
      LINE_API,
      {
        replyToken: replyToken,
        messages: [{ type: 'text', text: message }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LINE_TOKEN}`
        }
      }
    );
    console.log('✅ LINEへの返信成功');
  } catch (error) {
    console.error('❌ LINEへの返信失敗:', error.response ? error.response.data : error.message);
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Webhookサーバー起動: http://localhost:${PORT}`);
});

