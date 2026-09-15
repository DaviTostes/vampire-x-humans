# Deploy no VPS (GitHub Actions + Cloudflare Tunnel)

O workflow `.github/workflows/deploy.yml` publica o jogo a cada push em `master`.

## Fluxo

1. CI: `npm ci` → `check` → build do cliente.
2. `rsync` do repositório para `/opt/vampire-x-humans` no VPS.
3. No VPS, `deploy/install.sh` instala dependências e reinicia o serviço
   `vampire-x-humans.service` (HTTP + WebSocket na porta 3000).
4. O `cloudflared` expõe a porta pela rede do Cloudflare (Zero Trust).

## Secrets (Settings → Secrets and variables → Actions)

| Secret | Valor |
|---|---|
| `SSH_HOST` | IP ou domínio do VPS |
| `SSH_USER` | usuário com sudo sem senha (ou root) |
| `SSH_KEY` | chave privada ed25519 |
| `SSH_PORT` | porta SSH (opcional; padrão 22) |
| `TUNNEL_TOKEN` | token do túnel; necessário só no primeiro deploy |

## Cloudflare Zero Trust

Em **Networks → Tunnels**, crie o túnel, copie o token para `TUNNEL_TOKEN` e
adicione o public hostname:

```
vxh.mediumblue.space → HTTP → localhost:3000
```

O WebSocket `/ws` passa pelo mesmo hostname. Depois do primeiro deploy o túnel
fica registrado no VPS e `TUNNEL_TOKEN` pode ser removido dos secrets.

## Mapas salvos no editor

O editor salva em `packages/server/map-overlays/<mapId>.json`, tanto no
localhost quanto no VPS. Esses arquivos são versionados: depois de salvar no
editor local, inclua o JSON no commit e faça push em `master` para publicá-lo.
O deploy envia o mapa junto com o código e o servidor o carrega ao reiniciar.
As alterações são aplicadas às próximas partidas.

Arquivos antigos em `map-overlays/` na raiz do VPS só são usados quando não
existe um JSON correspondente na pasta versionada. O mapa enviado pelo Git
tem prioridade e substitui o arquivo correspondente no VPS a cada deploy;
para preservar edições feitas online, copie o JSON do VPS para o repositório
antes de publicar novamente.

## Manual (opcional)

Para registrar o túnel sem o workflow, rode no VPS:

```sh
sudo ./deploy/install.sh <TUNNEL_TOKEN>
```

Logs: `journalctl -u vampire-x-humans -f` e `journalctl -u cloudflared -f`.
