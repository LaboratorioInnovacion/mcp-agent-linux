gh repo create tu-usuario/mcp-agent --public --source=. --remote=origin --push
# 🧠 MCP Agent (CLI + Server) — Docker Ready

Este proyecto implementa un **agente local** con soporte **Model Context Protocol (MCP)**,  
capaz de ejecutar herramientas locales y conectarse con **OpenAI (GPT-5)** desde tu **servidor Ubuntu o WSL2**.

Incluye:
- Servidor MCP con herramientas locales (`leer_archivo`, `ejecutar_comando`).
- CLI interactiva conectada al modelo de OpenAI.
- Despliegue rápido con Docker Compose.
- Configuración lista para clonar, editar y subir a GitHub.

---

## 🚀 Requisitos

Antes de comenzar, asegurate de tener instalado:

- **Docker Engine** y **Docker Compose**
  ```bash
  sudo apt update
  sudo apt install -y docker.io docker-compose
  sudo systemctl enable --now docker

(Opcional para desarrollo) Node.js 20+ y npm

Una API Key válida de OpenAI
👉 https://platform.openai.com/account/api-keys

📦 Instalación y uso rápido
1️⃣ Clonar el repositorio
git clone https://github.com/tu-usuario/mcp-agent.git
cd mcp-agent

2️⃣ Configurar variables de entorno

Copia el archivo de ejemplo y agrega tu clave de OpenAI:

cp .env.example .env
nano .env


Ejemplo de contenido:

OPENAI_API_KEY=sk-xxxxx_tu_clave_aqui
MCP_PORT=3001

3️⃣ Construir y ejecutar con Docker
docker compose up --build


Esto:

Construirá la imagen del agente.

Creará el contenedor mcp-agent.

Abrirá la CLI dentro del contenedor (modo interactivo).

Si querés dejarlo corriendo en segundo plano:

docker compose up -d --build
docker logs -f mcp-agent

4️⃣ Usar el agente CLI

Podés conectarte a la CLI dentro del contenedor:

docker exec -it mcp-agent node src/cli-agent.mjs


Verás algo así:

🧠 MCP CLI Agent — escribí 'salir' para cerrar.
> 


Ahora podés conversar con el agente:

> hola
🤖 ¡Hola! Soy tu agente MCP en Ubuntu.


Para salir:

> salir
Adiós 👋