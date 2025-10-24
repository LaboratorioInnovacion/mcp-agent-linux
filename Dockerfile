FROM node:20-slim

WORKDIR /app

# Copiamos package first to cache install
COPY package.json package-lock.json* ./

RUN npm ci --omit=dev || npm install

COPY . .

ENV NODE_ENV=production

# Creamos carpeta de logs
RUN mkdir -p /app/logs

# Por defecto arrancamos la CLI interactiva; podés cambiar el CMD en docker-compose
CMD ["node", "src/cli-agent.mjs"]
