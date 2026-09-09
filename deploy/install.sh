#!/usr/bin/env bash
# Roda no VPS após cada deploy (chamado pelo workflow do GitHub).
# Uso: sudo ./deploy/install.sh [TUNNEL_TOKEN]
set -euo pipefail
cd "$(dirname "$0")/.."
TOKEN="${1:-}"

# Dependências do runtime (o build do cliente já vem pronto do CI).
npm ci --no-audit --no-fund

# Serviço systemd: substitui os placeholders pelo caminho real do app.
install -m 644 deploy/vampire-x-humans.service /etc/systemd/system/vampire-x-humans.service
sed -i "s|__APP_DIR__|$(pwd)|g" /etc/systemd/system/vampire-x-humans.service
systemctl daemon-reload
systemctl enable --now vampire-x-humans

# Cloudflare Tunnel (Zero Trust): o token identifica o túnel que este conector
# serve. Se o serviço existente aponta para outro túnel, ele é substituído.
if [ -n "$TOKEN" ]; then
  if ! command -v cloudflared >/dev/null 2>&1; then
    curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
      -o /usr/local/bin/cloudflared
    chmod +x /usr/local/bin/cloudflared
  fi
  CURRENT=$(sed -n 's/.*--token \(.*\)$/\1/p' /etc/systemd/system/cloudflared.service 2>/dev/null | tr -d '"' || true)
  if [ "$CURRENT" != "$TOKEN" ]; then
    systemctl stop cloudflared 2>/dev/null || true
    cloudflared service uninstall >/dev/null 2>&1 || true
    cloudflared service install "$TOKEN"
  fi
fi

systemctl restart vampire-x-humans
systemctl status vampire-x-humans --no-pager -l | head -5
