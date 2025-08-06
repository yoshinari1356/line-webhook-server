const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3999;
const LINE_REPLY_API = 'https://api.line.me/v2/bot/message/reply';
const LINE_PUSH_API = 'https://api.line.me/v2/bot/message/push';
const LINE_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

app.use(bodyParser.json());

// Webhookエンドポイント
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
      const userId = event.source.userId;

      // replyで応答
      await replyMessage(replyToken, `受け取りました: ${userMessage}`);

      // Pushメッセージで別メッセージ送信
      await pushMessage(userId, `追加メッセージ: ${userMessage} ありがとう！`);
    }
  }

  res.sendStatus(200);
});

// LINEに返信
async function replyMessage(replyToken, message) {
  try {
    await axios.post(
      LINE_REPLY_API,
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
    console.error('❌ LINEへの返信失敗:', error.response?.data || error.message);
  }
}

// Pushメッセージ送信
async function pushMessage(userId, message) {
  try {
    await axios.post(
      LINE_PUSH_API,
      {
        to: userId,
        messages: [{ type: 'text', text: message }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LINE_TOKEN}`
        }
      }
    );
    console.log('✅ Pushメッセージ送信成功', userId, message);
  } catch (error) {
    console.error('❌ Pushメッセージ送信失敗:', error.response?.data || error.message);
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Webhookサーバー起動: http://localhost:${PORT}`);
});

