# LINE Webhook + Messaging API サンプルサーバー

このリポジトリは、Node.js (Express) を使って **LINE Webhook受信・返信・Pushメッセージ送信** を行うサーバーです
LINEのユーザーID取得するのに使うために作りました

---

## ✅ 機能
- LINE Webhook受信
- ユーザーからのメッセージにReply（オウム返し）
- Webhook受信時にPushメッセージ送信
- 手動でPushメッセージ送信するAPIエンドポイント（`/send`）

---

## ✅ 必要条件
- Node.js 16以上
- LINE Messaging APIチャネル
- チャネルアクセストークン（長期）

---

## ✅ セットアップ

### 1. このリポジトリをクローン
```bash
git clone <YOUR_REPOSITORY_URL>
cd line-webhook-server
```

### 2. 依存パッケージをインストール
```bash
npm install
```
### 3. .env ファイルを作成
プロジェクト直下に .env を作成し、以下を設定します：
```ini
LINE_CHANNEL_ACCESS_TOKEN=YOUR_LINE_CHANNEL_ACCESS_TOKEN
```

### ✅ サーバー起動
```bash
node server.js
```

### ✅ Webhook URLの設定
LINE Developers Console で以下を設定：

```
https://<YOUR_PUBLIC_URL>/webhook
```

#### ngrok使って公開して接続すると便利
```
brew install ngrok/ngrok/ngrok
ngrok config add-authtoken xxxxxxxxxxx
ngrok http http://localhost:3999
```

### ✅ API エンドポイント
1. Webhook受信用
POST /webhook

LINEプラットフォームからのWebhookイベントを受信します。

2. 手動Push送信用
POST /send

リクエスト例：
```bash
curl -X POST http://localhost:3999/send \
  -H "Content-Type: application/json" \
  -d '{"userId":"USER_ID","message":"手動Pushメッセージ"}'
```
