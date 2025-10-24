import dotenv from "dotenv";
dotenv.config();

import { MCPServer } from "@modelcontextprotocol/sdk/server.js";
import fs from "fs";
import { exec } from "child_process";
import OpenAI from "openai";

const PORT = process.env.MCP_PORT || 3001;
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const server = new MCPServer({ name: "mcp-ubuntu-agent" });

// tool: leer archivo (control simple)
server.tool("leer_archivo", async ({ input }) => {
  if (typeof input !== "string") throw new Error("Se requiere la ruta del archivo como string.");
  // Restringir a carpeta /app/logs para seguridad (ajustá según necesidad)
  if (!input.startsWith("/app/") && !input.startsWith("./") && !input.startsWith("/var/log")) {
    throw new Error("Acceso a esa ruta denegado por seguridad.");
  }
  return fs.readFileSync(input, "utf-8");
});

// tool: ejecutar_comando (WHITELIST)
const WHITELIST = ["ls", "cat", "df", "du", "uname", "whoami", "systemctl", "journalctl", "ps"];
server.tool("ejecutar_comando", async ({ input }) => {
  if (typeof input !== "string") throw new Error("Comando inválido.");
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0];
  if (!WHITELIST.includes(cmd)) {
    throw new Error("Comando no permitido por política de seguridad.");
  }

  return new Promise((resolve, reject) => {
    exec(input, { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) return reject(stderr || err.message);
      resolve(stdout || stderr || "");
    });
  });
});

// Simple "bridge" para que el servidor use OpenAI
server.model("gpt-5", async (messages) => {
  const res = await client.chat.completions.create({
    model: "gpt-5",
    messages,
    max_tokens: 800
  });
  return res.choices[0].message;
});

server.listen(PORT);
console.log(`🚀 MCP Server corriendo en puerto ${PORT}`);
