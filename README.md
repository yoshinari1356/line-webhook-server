# サーバー起動
node server.js

# Tailscale公開
tailscale serve --bg 3999

# Funnel有効化
tailscale funnel on

# 状態確認
tailscale serve status
tailscale funnel status
