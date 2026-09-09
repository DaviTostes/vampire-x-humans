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

# Cloudflare Tunnel (Zero Trust): instala o cloudflared e registra o serviço
# apenas na primeira vez em que um token for informado. O restante da
# configuração (hostname público → http://localhost:3000) fica no painel
# do Zero Trust, Networks → Tunnels:
#   Public hostname: vxh.mediumblue.space → HTTP → localhost:3000
if [ -n "$TOKEN" ]; then
  if ! command -v cloudflared >/dev/null 2>&1; then
    curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
      -o /usr/local/bin/cloudflared
    chmod +x /usr/local/bin/cloudflared
  fi
  if ! systemctl cat cloudflared >/dev/null 2>&1; then
    cloudflared service install "$TOKEN"
  fi
  systemctl restart cloudflared
fi

systemctl restart vampire-x-humans
systemctl status vampire-x-humans --no-pager -l | head -5
