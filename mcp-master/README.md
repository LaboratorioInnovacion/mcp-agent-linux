# 🧠 MCP Linux Agent (Educativo)

Agente CLI inteligente para Ubuntu Server / WSL que:
- Lee e inspecciona archivos del sistema
- Revisa contenedores Docker
- Analiza el estado del servidor (CPU, RAM, disco)
- Explica paso a paso cómo resolver problemas

## Requisitos
- Docker & Docker Compose
- OpenAI API Key

## Instalación y uso rápido
```bash
git clone <tu-repo-url> mcp-linux-agent
cd mcp-linux-agent
cp .env.example .env
# editar .env y pegar OPENAI_API_KEY
docker compose up -d --build
docker exec -it mcp-agent node src/cli-agent.mjs
```

## Comandos de ejemplo
> mostrar estado del sistema
> leer archivo /etc/nginx/nginx.conf
> analizar contenedores docker
> explicame cómo reiniciar Docker

## Seguridad
- .env está ignorado por git en .gitignore
- El contenedor monta el host en solo lectura (/host) por seguridad
